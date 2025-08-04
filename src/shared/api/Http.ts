export class Http {
  private host: string;
  constructor(host: string) {
    this.host = host;
  }

  async get(
    path: string,
    data: Record<string, unknown> | null = null,
    sessionId: string | null = null
  ) {
    const url = new URL(path, this.host);
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
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

    if (res.status < 200 || res.status > 299) {
      throw new Error("http error: " + res.statusText);
    }

    return res.json();
  }

  async post(
    path: string,
    data: Record<string, unknown> | null = null,
    sessionId: string | null = null
  ) {
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

    if (res.status < 200 || res.status > 299) {
      throw new Error("http error: " + res.statusText);
    }

    return res.json();
  }
}
