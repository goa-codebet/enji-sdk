import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import { AddLimit, Limit } from "./types";

export class ResponsibleGamingLimitClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get all active and canceled limits on the players account
   *
   * Requires session
   */
  async getAll(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<Limit[]>(
      "/responsiblegaming/limit",
      null,
      sessionId,
      config
    );
  }

  /**
   * Add a responsible gaming limit to the players account.
   * Session limits need frontend support to limit the active game session length.
   * LoginTime limit are added in minutes
   *
   * Requires session
   */
  async add(sessionId: string, limit: AddLimit, config?: EnjiRequestConfig) {
    return this.http.post(
      "/responsiblegaming/limit/v2",
      limit,
      sessionId,
      config
    );
  }

  async remove(
    sessionId: string,
    options: { id: number; pgsiScore?: number },
    config?: EnjiRequestConfig
  ) {
    return this.http.post(
      `/responsiblegaming/limit/cancel/${options.id}${options.pgsiScore ? `?pgsiScore=${options.pgsiScore}` : ""}`,
      null,
      sessionId,
      config
    );
  }
}
