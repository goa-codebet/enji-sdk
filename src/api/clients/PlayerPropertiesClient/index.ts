import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
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
  async get(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<PlayerProperty[]>(
      "/player-properties",
      null,
      sessionId,
      config
    );
  }

  /**
   * Add/Update the specific Player's properties
   *
   * Requires session
   */
  async set(
    sessionId: string,
    params: SetPlayerPropertiesParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post<PlayerProperty[]>(
      "/player-properties",
      params,
      sessionId,
      config
    );
  }

  /**
   * Get specific property of a player
   */
  async getByName(sessionId: string, name: string, config?: EnjiRequestConfig) {
    return this.http.get<PlayerProperty>(
      `/player-properties/${name}`,
      null,
      sessionId,
      config
    );
  }
}
