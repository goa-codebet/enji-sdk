import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import { Jackpot, SkinGame } from "./types";
import { Currency } from "@/api/types";

export class EventFeedClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get all jackpots
   */
  async getJackpots(
    sessionId: string,
    currency?: Currency,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<Jackpot[]>(
      "/event-feed/jackpots",
      { currency },
      sessionId,
      config
    );
  }

  /**
   * Get list of top games
   */
  async getTopGames(
    sessionId: string,
    max: number,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<SkinGame[]>(
      `/event-feed/top-games/${max}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Get list of top games by total wager
   */
  async getTopGamesByWager(
    sessionId: string,
    max: number,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<SkinGame[]>(
      `/event-feed/top-games-wager/${max}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Get list of top games by unique wagering customers
   */
  async getTopGamesByUWC(
    sessionId: string,
    max: number,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<SkinGame[]>(
      `/event-feed/top-games-uwc/${max}`,
      null,
      sessionId,
      config
    );
  }
}
