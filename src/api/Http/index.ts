import jsSHA from "jssha";
import type { EnjiResult } from "../../client/EnjiResult";
import type { EnjiRequestConfig, HttpOptions } from "./types";

export class Http {
  private host: string;
  private apiId: string;
  private apiSecret: string;
  private getClientIp?: () => Promise<string | null | undefined>;

  constructor(
    host: string,
    apiId: string,
    apiSecret: string,
    options?: HttpOptions
  ) {
    this.host = host;
    this.apiId = apiId;
    this.apiSecret = apiSecret;
    this.getClientIp = options?.getClientIp;
  }

  private async resolveClientIp(): Promise<string | null> {
    if (!this.getClientIp) return null;
    const ip = await this.getClientIp();
    if (!ip) return null;
    return ip === "::1" ? "127.0.0.1" : ip;
  }

  private sign(data: string): string {
    const sha = new jsSHA("SHA-256", "TEXT");
    sha.setHMACKey(this.apiSecret, "TEXT");
    sha.update(data);
    return sha.getHMAC("B64");
  }

  private getToken({
    requestId,
    timestamp,
    path,
    sessionId,
    clientIp,
    data,
  }: {
    requestId: number;
    timestamp: number;
    path: string;
    sessionId: string | null;
    clientIp: string | null;
    data: unknown;
  }): string {
    const values: (string | number)[] = [this.apiId, requestId, timestamp];
    if (sessionId) values.push(sessionId);
    if (clientIp) values.push(clientIp);
    values.push(path);
    values.push(data ? JSON.stringify(data) : "");
    return this.sign(values.join("\n"));
  }

  private async buildAuthHeaders(
    path: string,
    sessionId: string | null,
    data: unknown
  ): Promise<Record<string, string>> {
    const clientIp = await this.resolveClientIp();
    const requestId = Math.floor(Math.random() * 100000);
    const timestamp = Math.round(new Date().getTime() / 1000);
    const token = this.getToken({
      requestId,
      timestamp,
      path,
      sessionId,
      clientIp,
      data,
    });
    const headers: Record<string, string> = {
      Authorization: `amx ${this.apiId}:${token}:${requestId}:${timestamp}`,
    };
    if (clientIp) headers["X-Client-Ip"] = clientIp;
    return headers;
  }

  private async handleResponse<T>(res: Response): Promise<EnjiResult<T>> {
    if (!res.ok) {
      let errorData: { Code: string; Message: string; Details?: Record<string, string> };
      if (
        res.headers.get("Content-Length") === "0" ||
        !res.headers.get("Content-Type")?.includes("application/json")
      ) {
        errorData = {
          Code: "UnknownError",
          Message: "An unknown error occurred",
        };
      } else {
        errorData = await res.json();
      }
      return {
        data: null,
        error: {
          code: errorData.Code,
          message: errorData.Message,
          details: errorData.Details,
        },
      };
    }

    let data: T | null = null;
    if (
      res.headers.get("Content-Type")?.includes("application/json") &&
      res.headers.get("Content-Length") !== "0"
    ) {
      data = await res.json();
    }

    return { data: data as T, error: null };
  }

  async get<T = null>(
    path: string,
    data: Record<string, unknown> | object | null = null,
    sessionId: string | null = null,
    config?: EnjiRequestConfig
  ): Promise<EnjiResult<T>> {
    const url = new URL(path, this.host);
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const signedPath = url.pathname + url.search;
    const authHeaders = await this.buildAuthHeaders(signedPath, sessionId, null);
    const headers: Record<string, string> = {
      accept: "application/json",
      "content-type": "application/json",
      ...authHeaders,
    };
    if (sessionId) {
      headers["X-Player-Session-Id"] = sessionId;
    }
    const mergedHeaders = { ...headers, ...(config?.headers || {}) };
    const { next, ...restConfig } = config || {};
    const fetchOptions: RequestInit & {
      next?: { revalidate?: number | false };
    } = {
      ...restConfig,
      method: "GET",
      headers: mergedHeaders,
      ...(next ? { next } : {}),
    };
    const res = await fetch(url, fetchOptions);
    return this.handleResponse<T>(res);
  }

  async post<T = null>(
    path: string,
    data: Record<string, unknown> | object | null = null,
    sessionId: string | null = null,
    config?: EnjiRequestConfig
  ): Promise<EnjiResult<T>> {
    const url = new URL(path, this.host);
    const signedPath = url.pathname + url.search;
    const authHeaders = await this.buildAuthHeaders(signedPath, sessionId, data);
    const headers: Record<string, string> = {
      accept: "application/json",
      ...authHeaders,
    };
    if (sessionId) {
      headers["X-Player-Session-Id"] = sessionId;
    }
    if (data) {
      headers["content-type"] = "application/json";
    }
    const mergedHeaders = { ...headers, ...(config?.headers || {}) };
    const { next, ...restConfig } = config || {};
    const fetchOptions: RequestInit & {
      next?: { revalidate?: number | false };
    } = {
      ...restConfig,
      method: "POST",
      headers: mergedHeaders,
      body: data ? JSON.stringify(data) : null,
      ...(next ? { next } : {}),
    };
    const res = await fetch(url, fetchOptions);
    return this.handleResponse<T>(res);
  }
}
