import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";

export class PlayerGroupsClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Get a list of all player groups that the player belongs to
   *
   * Requires session
   */
  async getPlayerGroups() {
    return this.http.get<string[]>("/player-groups", null, this.sessionId);
  }
}
