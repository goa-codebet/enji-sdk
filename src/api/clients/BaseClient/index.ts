import { Http } from "@/api/Http";

export abstract class BaseClient {
  private _http: Http;
  sessionId: string | null;

  constructor(http: Http, sessionId: string | null = null) {
    this._http = http;
    this.sessionId = sessionId;
  }

  get http() {
    return this._http;
  }
}
