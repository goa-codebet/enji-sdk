import { BaseClient } from "./BaseClient";
import { Http } from "./Http";

export class ResponsibleGamingClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }
}
