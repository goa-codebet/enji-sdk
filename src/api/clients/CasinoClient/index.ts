import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { CasinoGame, CasinoGameInfo, Platform } from "./types";
export class CasinoClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Get a list of all active casino games
   */
  async getAll(): Promise<CasinoGame[]> {
    return this.http.get<CasinoGame[]>("/casino");
  }

  /**
   * Gets all information that is required to launch the specific game
   *
   */
  async getGameInfo(gameId: number): Promise<CasinoGameInfo> {
    return this.http.get<CasinoGameInfo>(
      `/casino/gameinfo/${gameId}`,
      null,
      this.sessionId
    );
  }

  /**
   * Set favorite game/table
   *
   * Requires session
   */
  async setFavorite(
    gameId: number,
    tableId?: number,
    setLinkedGames?: boolean
  ): Promise<boolean> {
    const query = new URLSearchParams();
    if (tableId) {
      query.append("tableId", tableId.toString());
    }
    if (setLinkedGames) {
      query.append("setLinkedGames", setLinkedGames.toString());
    }
    return this.http.post<boolean>(
      `/casino/set-favorite/${gameId}?${query.toString()}`,
      null,
      this.sessionId
    );
  }

  /**
   * Remove favorite game/table
   *
   * Requires session
   */
  async removeFavorite(
    gameId: number,
    tableId?: number,
    removeLinkedGames?: boolean
  ): Promise<boolean> {
    const query = new URLSearchParams();
    if (tableId) {
      query.append("tableId", tableId.toString());
    }
    if (removeLinkedGames) {
      query.append("removeLinkedGames", removeLinkedGames.toString());
    }
    return this.http.post<boolean>(
      `/casino/remove-favorite/${gameId}?${query.toString()}`,
      null,
      this.sessionId
    );
  }

  /**
   * Get all favorite games
   *
   * Requires session
   */
  async getFavorites(): Promise<CasinoGame[]> {
    return this.http.get<CasinoGame[]>(
      "/casino/favorites",
      null,
      this.sessionId
    );
  }

  /**
   * Set the last played game
   *
   * Requires session
   */
  async setLastPlayed(
    gameId: number,
    tableId?: number,
    setLinkedGames?: boolean
  ): Promise<void> {
    const query = new URLSearchParams({ gameId: gameId.toString() });
    if (tableId) {
      query.append("tableId", tableId.toString());
    }

    if (setLinkedGames) {
      query.append("setLinkedGames", setLinkedGames.toString());
    }
    return this.http.post(
      `/casino/set-last-played-game?${query.toString()}`,
      null,
      this.sessionId
    );
  }

  /**
   * Get last played games
   *
   * Requires session
   */
  async getLastPlayed(options: {
    platform?: Platform;
    max?: number;
    offset?: number;
  }): Promise<CasinoGame[]> {
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
      this.sessionId
    );
  }

  /**
   * Netent game provider. Create a session identifier that can be used to launch a game
   *
   * This method should be used before each launch of a new play-for-real game
   *
   * Requires session
   */
  async createNetendSessionId(channel?: "mobg" | "bbg"): Promise<string> {
    const query = new URLSearchParams();
    if (channel) {
      query.append("channel", channel);
    }

    return this.http.get<string>(
      `/casino/create-netent-session-id?${query.toString()}`,
      null,
      this.sessionId
    );
  }

  /**
   * Endorphina game provider. Create a session identifier that can be used to launch a game
   *
   * Requires session
   */
  async createEndorphinaSessionId(externalGameId: string): Promise<string> {
    return this.http.get<string>(
      `/casino/create-endorphina-session-id?externalGameId=${externalGameId}`,
      null,
      this.sessionId
    );
  }

  /**
   * Ganapati game provider. Create a session identifier that can be used to launch a game
   *
   * Requires session
   */
  async createGanapatiSessionId(externalGameId: string): Promise<string> {
    return this.http.get<string>(
      `/casino/create-ganapati-session-id?externalGameId=${externalGameId}`,
      null,
      this.sessionId
    );
  }

  /**
   * Redtiger game provider. Create a session identifier that can be used to launch a game
   *
   * Requires session
   */
  async createRedtigerSessionId(externalGameId: string): Promise<string> {
    return this.http.get<string>(
      `/casino/create-redtiger-session-id?externalGameId=${externalGameId}`,
      null,
      this.sessionId
    );
  }
}
