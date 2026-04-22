import type { EnjiResult } from "../../client/EnjiResult";
import type { EnjiRequestConfig } from "./types";

export class Http {
  private host: string;
  constructor(host: string) {
    this.host = host;
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

    const headers: Record<string, string> = {
      accept: "application/json",
      "content-type": "application/json",
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
    const headers: Record<string, string> = {
      accept: "application/json",
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
