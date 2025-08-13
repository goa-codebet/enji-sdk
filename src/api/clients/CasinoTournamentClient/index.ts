import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { TournamentInfo, TournamentLeaderboard } from "./types";

export class CasinoTournamentClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Get all casino tournaments
   */
  async getAll(params?: {
    gameId?: number;
    tableId?: string;
    orderBy?: string;
    sortDescending?: boolean;
  }) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament",
      params || null,
      this.sessionId
    );
  }

  /**
   * Get all active casino tournaments
   */
  async getActive(params?: {
    GameId?: number;
    TableId?: string;
    OrderBy?: string;
    SortDescending?: boolean;
  }) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament/active",
      params || null,
      this.sessionId
    );
  }

  /**
   * Get all finished casino tournaments
   */
  async getFinished(params?: {
    GameId?: number;
    TableId?: string;
    OrderBy?: string;
    SortDescending?: boolean;
  }) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament/finished",
      params || null,
      this.sessionId
    );
  }

  /**
   * Get all upcoming casino tournaments
   */
  async getUpcoming(params?: {
    GameId?: number;
    TableId?: string;
    OrderBy?: string;
    SortDescending?: boolean;
  }) {
    return this.http.get<TournamentInfo[]>(
      "/casinotournament/upcoming",
      params || null,
      this.sessionId
    );
  }

  /**
   * Get leaderboard for a tournament
   */
  async getLeaderboard(params: {
    TournamentIdentifier?: string;
    Offset?: number;
    Limit?: number;
  }) {
    return this.http.get<TournamentLeaderboard>(
      "/casinotournament/leaderboard",
      params,
      this.sessionId
    );
  }

  /**
   * Get all leaderbord relative
   */
  async getLeaderboardRelative(params: {
    tournamentIdentifier?: string;
    playerId?: number;
    limit?: number;
  }) {
    return this.http.get<TournamentLeaderboard>(
      "/casinotournament/leaderboard-relative",
      params,
      this.sessionId
    );
  }
}
