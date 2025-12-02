import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import {
  CreateBetssonContextParams,
  CreateBetssonContextResponse,
} from "./types";

export class SportsbookClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Create Betsson sportsbook context
   * Requires session
   */
  async createBetssonContext(
    sessionId: string,
    params: CreateBetssonContextParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post<CreateBetssonContextResponse>(
      "/sportsbook/create-betsson-context",
      params,
      sessionId,
      config
    );
  }
}
