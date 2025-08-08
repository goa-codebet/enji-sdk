import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { AddLimit, Limit } from "./types";

export class ResponsibleGamingLimitClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Get all active and canceled limits on the players account
   *
   * Requires session
   */
  async getAll() {
    return this.http.get<Limit[]>(
      "/responsiblegaming/limit",
      null,
      this.sessionId
    );
  }

  /**
   * Add a responsible gaming limit to the players account.
   * Session limits need frontend support to limit the active game session length.
   * LoginTime limit are added in minutes
   *
   * Requires session
   */
  async add(limit: AddLimit) {
    return this.http.post("/responsiblegaming/limit/v2", limit, this.sessionId);
  }

  async remove(id: number, pgsiScore?: number) {
    return this.http.post(
      `/responsiblegaming/limit/cancel/${id}${pgsiScore ? `?pgsiScore=${pgsiScore}` : ""}`,
      null,
      this.sessionId
    );
  }
}
