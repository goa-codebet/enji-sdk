import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { PlayerProperty, SetPlayerPropertiesParams } from "./types";

export class PlayerPropertiesClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get all properties of a player
   *
   * Requires session
   */
  async get() {
    return this.http.get<PlayerProperty[]>(
      "/player-properties",
      null,
      sessionId
    );
  }

  /**
   * Add/Update the specific Player's properties
   *
   * Requires session
   */
  async set(params: SetPlayerPropertiesParams) {
    return this.http.post<PlayerProperty[]>(
      "/player-properties",
      params,
      sessionId
    );
  }

  /**
   * Get specific property of a player
   */
  async getByName(name: string) {
    return this.http.get<PlayerProperty>(
      `/player-properties/${name}`,
      null,
      sessionId
    );
  }
}
