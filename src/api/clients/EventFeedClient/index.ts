import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { Jackpot, SkinGame } from "./types";
import { Currency } from "@/api/types";

export class EventFeedClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Get all jackpots
   */
  async getJackpots(currency?: Currency): Promise<Jackpot[]> {
    return this.http.get<Jackpot[]>("/event-feed/jackpots", { currency });
  }

  /**
   * Get list of top games
   */
  async getTopGames(max: number): Promise<SkinGame[]> {
    return this.http.get<SkinGame[]>(`/event-feed/top-games/${max}`);
  }

  /**
   * Get list of top games by total wager
   */
  async getTopGamesByWager(max: number): Promise<SkinGame[]> {
    return this.http.get<SkinGame[]>(`/event-feed/top-games-wager/${max}`);
  }

  /**
   * Get list of top games by unique wagering customers
   */
  async getTopGamesByUWC(max: number): Promise<SkinGame[]> {
    return this.http.get<SkinGame[]>(`/event-feed/top-games-uwc/${max}`);
  }
}
