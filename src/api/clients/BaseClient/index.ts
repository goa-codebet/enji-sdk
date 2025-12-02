import { Http } from "@/api/Http";

export abstract class BaseClient {
  private _http: Http;

  constructor(http: Http) {
    this._http = http;
  }

  get http() {
    return this._http;
  }
}
