import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";

export class PlayerGroupsClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get a list of all player groups that the player belongs to
   *
   * Requires session
   */
  async getPlayerGroups(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<string[]>("/player-groups", null, sessionId, config);
  }
}
