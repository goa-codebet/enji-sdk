import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { CasinoGame, CasinoGameInfo, Platform } from "./types";
export class CasinoClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get a list of all active casino games
   */
  async getAll() {
    return this.http.get<CasinoGame[]>("/casino");
  }

  /**
   * Gets all information that is required to launch the specific game
   *
   */
  async getGameInfo(sessionId: string, gameId: number) {
    return this.http.get<CasinoGameInfo>(
      `/casino/gameinfo/${gameId}`,
      null,
      sessionId
    );
  }

  /**
   * Set favorite game/table
   *
   * Requires session
   */
  async setFavorite(
    sessionId: string,
    gameId: number,
    tableId?: number,
    setLinkedGames?: boolean
  ) {
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
      sessionId
    );
  }

  /**
   * Remove favorite game/table
   *
   * Requires session
   */
  async removeFavorite(
    sessionId: string,
    gameId: number,
    tableId?: number,
    removeLinkedGames?: boolean
  ) {
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
      sessionId
    );
  }

  /**
   * Get all favorite games
   *
   * Requires session
   */
  async getFavorites(sessionId: string) {
    return this.http.get<CasinoGame[]>("/casino/favorites", null, sessionId);
  }

  /**
   * Set the last played game
   *
   * Requires session
   */
  async setLastPlayed(
    sessionId: string,
    gameId: number,
    tableId?: number,
    setLinkedGames?: boolean
  ) {
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
      sessionId
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
    }
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
      sessionId
    );
  }

  /**
   * Netent game provider. Create a session identifier that can be used to launch a game
   *
   * This method should be used before each launch of a new play-for-real game
   *
   * Requires session
   */
  async createNetendSessionId(sessionId: string, channel?: "mobg" | "bbg") {
    const query = new URLSearchParams();
    if (channel) {
      query.append("channel", channel);
    }

    return this.http.get<string>(
      `/casino/create-netent-session-id?${query.toString()}`,
      null,
      sessionId
    );
  }

  /**
   * Endorphina game provider. Create a session identifier that can be used to launch a game
   *
   * Requires session
   */
  async createEndorphinaSessionId(sessionId: string, externalGameId: string) {
    return this.http.get<string>(
      `/casino/create-endorphina-session-id?externalGameId=${externalGameId}`,
      null,
      sessionId
    );
  }

  /**
   * Ganapati game provider. Create a session identifier that can be used to launch a game
   *
   * Requires session
   */
  async createGanapatiSessionId(sessionId: string, externalGameId: string) {
    return this.http.get<string>(
      `/casino/create-ganapati-session-id?externalGameId=${externalGameId}`,
      null,
      sessionId
    );
  }

  /**
   * Redtiger game provider. Create a session identifier that can be used to launch a game
   *
   * Requires session
   */
  async createRedtigerSessionId(sessionId: string, externalGameId: string) {
    return this.http.get<string>(
      `/casino/create-redtiger-session-id?externalGameId=${externalGameId}`,
      null,
      sessionId
    );
  }
}
