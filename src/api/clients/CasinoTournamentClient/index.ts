import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import { TournamentInfo, TournamentLeaderboard } from "./types";

export class CasinoTournamentClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get all casino tournaments
   */
  async getAll(
    sessionId: string,
    params?: {
      gameId?: number;
      tableId?: string;
      orderBy?: string;
      sortDescending?: boolean;
    },
    config?: EnjiRequestConfig
  ) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament",
      params || null,
      sessionId,
      config
    );
  }

  /**
   * Get all active casino tournaments
   */
  async getActive(
    sessionId: string,
    params?: {
      GameId?: number;
      TableId?: string;
      OrderBy?: string;
      SortDescending?: boolean;
    },
    config?: EnjiRequestConfig
  ) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament/active",
      params || null,
      sessionId,
      config
    );
  }

  /**
   * Get all finished casino tournaments
   */
  async getFinished(
    sessionId: string,
    params?: {
      GameId?: number;
      TableId?: string;
      OrderBy?: string;
      SortDescending?: boolean;
    },
    config?: EnjiRequestConfig
  ) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament/finished",
      params || null,
      sessionId,
      config
    );
  }

  /**
   * Get all upcoming casino tournaments
   */
  async getUpcoming(
    sessionId: string,
    params?: {
      GameId?: number;
      TableId?: string;
      OrderBy?: string;
      SortDescending?: boolean;
    },
    config?: EnjiRequestConfig
  ) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament/upcoming",
      params || null,
      sessionId,
      config
    );
  }

  /**
   * Get leaderboard for a tournament
   */
  async getLeaderboard(
    sessionId: string,
    params: {
      TournamentIdentifier?: string;
      Offset?: number;
      Limit?: number;
    },
    config?: EnjiRequestConfig
  ) {
    return this.http.get<TournamentLeaderboard>(
      "/casinotournament/leaderboard",
      params,
      sessionId,
      config
    );
  }

  /**
   * Get all leaderbord relative
   */
  async getLeaderboardRelative(
    sessionId: string,
    params: {
      tournamentIdentifier?: string;
      playerId?: number;
      limit?: number;
    },
    config?: EnjiRequestConfig
  ) {
    return this.http.get<TournamentLeaderboard>(
      "/casinotournament/leaderboard-relative",
      params,
      sessionId,
      config
    );
  }
}
