import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { CreateBetssonContextParams } from "./types";

export class SportsbookClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Create Betsson sportsbook context
   * Requires session
   */
  async createBetssonContext(
    params: CreateBetssonContextParams
  ): Promise<unknown> {
    return this.http.post(
      "/sportsbook/create-betsson-context",
      params,
      this.sessionId
    );
  }
}
