import { EnjiError, Result } from "../types";

export class Http {
  private host: string;
  constructor(host: string) {
    this.host = host;
  }

  private async handleResponse<T>(res: Response): Promise<Result<T>> {
    if (!res.ok) {
      let error: EnjiError;
      if (
        res.headers.get("Content-Length") === "0" ||
        !res.headers.get("Content-Type")?.includes("application/json")
      ) {
        error = {
          Code: "UnknownError",
          Message: "An unknown error occurred",
          Details: null,
        };
      } else {
        error = await res.json();
      }
      return {
        success: false,
        error,
      };
    }

    let data: T | null = null;
    if (
      res.headers.get("Content-Type")?.includes("application/json") &&
      res.headers.get("Content-Length") !== "0"
    ) {
      data = await res.json();
    }

    return {
      success: true,
      data: data as T,
    };
  }

  async get<T = null>(
    path: string,
    data: Record<string, unknown> | object | null = null,
    sessionId: string | null = null
  ): Promise<Result<T>> {
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

    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    return this.handleResponse<T>(res);
  }

  async post<T = null>(
    path: string,
    data: Record<string, unknown> | object | null = null,
    sessionId: string | null = null
  ): Promise<Result<T>> {
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
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    return this.handleResponse<T>(res);
  }
}
