import { EnjiError } from "../../client/EnjiError";

export class Http {
  private host: string;
  constructor(host: string) {
    this.host = host;
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      let errorData: Pick<EnjiError, "Code" | "Details"> & {
        Message: string;
      };
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
      throw new EnjiError({
        Code: errorData.Code,
        Message: errorData.Message,
        Details: errorData.Details,
      });
    }

    let data: T | undefined = undefined;
    if (
      res.headers.get("Content-Type")?.includes("application/json") &&
      res.headers.get("Content-Length") !== "0"
    ) {
      data = await res.json();
    }

    return data as T;
  }

  async get<T = null>(
    path: string,
    data: Record<string, unknown> | object | null = null,
    sessionId: string | null = null
  ): Promise<T> {
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
  ): Promise<T> {
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
