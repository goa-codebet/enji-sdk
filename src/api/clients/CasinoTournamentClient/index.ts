import { Http } from "@/api/Http";
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
    }
  ) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament",
      params || null,
      sessionId
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
    }
  ) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament/active",
      params || null,
      sessionId
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
    }
  ) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament/finished",
      params || null,
      sessionId
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
    }
  ) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament/upcoming",
      params || null,
      sessionId
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
    }
  ) {
    return this.http.get<TournamentLeaderboard>(
      "/casinotournament/leaderboard",
      params,
      sessionId
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
    }
  ) {
    return this.http.get<TournamentLeaderboard>(
      "/casinotournament/leaderboard-relative",
      params,
      sessionId
    );
  }
}
