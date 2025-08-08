import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import {
  CreateBetssonContextParams,
  CreateBetssonContextResponse,
} from "./types";

export class SportsbookClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Create Betsson sportsbook context
   * Requires session
   */
  async createBetssonContext(params: CreateBetssonContextParams) {
    return this.http.post<CreateBetssonContextResponse>(
      "/sportsbook/create-betsson-context",
      params,
      this.sessionId
    );
  }
}
