import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import { CasinoGame, CasinoGameInfo, Platform } from "./types";
export class CasinoClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get a list of all active casino games
   */
  async getAll(config?: EnjiRequestConfig) {
    return this.http.get<CasinoGame[]>("/casino", null, null, config);
  }

  /**
   * Gets all information that is required to launch the specific game
   *
   */
  async getGameInfo(
    sessionId: string,
    gameId: number,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<CasinoGameInfo>(
      `/casino/gameinfo/${gameId}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Set favorite game/table
   *
   * Requires session
   */
  async setFavorite(
    sessionId: string,
    options: {
      gameId: number;
      tableId?: number;
      setLinkedGames?: boolean;
    },
    config?: EnjiRequestConfig
  ) {
    const query = new URLSearchParams();
    if (options.tableId) {
      query.append("tableId", options.tableId.toString());
    }
    if (options.setLinkedGames) {
      query.append("setLinkedGames", options.setLinkedGames.toString());
    }
    return this.http.post<boolean>(
      `/casino/set-favorite/${options.gameId}?${query.toString()}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Remove favorite game/table
   *
   * Requires session
   */
  async removeFavorite(
    sessionId: string,
    options: {
      gameId: number;
      tableId?: number;
      removeLinkedGames?: boolean;
    },
    config?: EnjiRequestConfig
  ) {
    const query = new URLSearchParams();
    if (options.tableId) {
      query.append("tableId", options.tableId.toString());
    }
    if (options.removeLinkedGames) {
      query.append("removeLinkedGames", options.removeLinkedGames.toString());
    }
    return this.http.post<boolean>(
      `/casino/remove-favorite/${options.gameId}?${query.toString()}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Get all favorite games
   *
   * Requires session
   */
  async getFavorites(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<CasinoGame[]>(
      "/casino/favorites",
      null,
      sessionId,
      config
    );
  }

  /**
   * Set the last played game
   *
   * Requires session
   */
  async setLastPlayed(
    sessionId: string,
    options: {
      gameId: number;
      tableId?: number;
      setLinkedGames?: boolean;
    },
    config?: EnjiRequestConfig
  ) {
    const query = new URLSearchParams({ gameId: options.gameId.toString() });
    if (options.tableId) {
      query.append("tableId", options.tableId.toString());
    }

    if (options.setLinkedGames) {
      query.append("setLinkedGames", options.setLinkedGames.toString());
    }
    return this.http.post(
      `/casino/set-last-played-game?${query.toString()}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Get last played games
   *
   * Requires session
   */
  async getLastPlayed(
    sessionId: string,
    options: {
      platform?: Platform;
      max?: number;
      offset?: number;
    },
    config?: EnjiRequestConfig
  ) {
    const query = new URLSearchParams();
    if (options.platform) {
      query.append("platform", options.platform);
    }
    if (options.max) {
      query.append("max", options.max.toString());
    }
    if (options.offset) {
      query.append("offset", options.offset.toString());
    }
    return this.http.get<CasinoGame[]>(
      `/casino/last-played-games?${query.toString()}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Netent game provider. Create a session identifier that can be used to launch a game
   *
   * This method should be used before each launch of a new play-for-real game
   *
   * Requires session
   */
  async createNetendSessionId(
    sessionId: string,
    channel?: "mobg" | "bbg",
    config?: EnjiRequestConfig
  ) {
    const query = new URLSearchParams();
    if (channel) {
      query.append("channel", channel);
    }

    return this.http.get<string>(
      `/casino/create-netent-session-id?${query.toString()}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Endorphina game provider. Create a session identifier that can be used to launch a game
   *
   * Requires session
   */
  async createEndorphinaSessionId(
    sessionId: string,
    externalGameId: string,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<string>(
      `/casino/create-endorphina-session-id?externalGameId=${externalGameId}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Ganapati game provider. Create a session identifier that can be used to launch a game
   *
   * Requires session
   */
  async createGanapatiSessionId(
    sessionId: string,
    externalGameId: string,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<string>(
      `/casino/create-ganapati-session-id?externalGameId=${externalGameId}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Redtiger game provider. Create a session identifier that can be used to launch a game
   *
   * Requires session
   */
  async createRedtigerSessionId(
    sessionId: string,
    externalGameId: string,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<string>(
      `/casino/create-redtiger-session-id?externalGameId=${externalGameId}`,
      null,
      sessionId,
      config
    );
  }
}
