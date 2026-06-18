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
  async getJackpots(currency?: Currency, config?: EnjiRequestConfig) {
    return this.http.get<Jackpot[]>(
      "/event-feed/jackpots",
      { currency },
      null,
      config
    );
  }

  /**
   * Get list of top games
   */
  async getTopGames(max: number, config?: EnjiRequestConfig) {
    return this.http.get<SkinGame[]>(
      `/event-feed/top-games/${max}`,
      null,
      null,
      config
    );
  }

  /**
   * Get list of top games by total wager
   */
  async getTopGamesByWager(max: number, config?: EnjiRequestConfig) {
    return this.http.get<SkinGame[]>(
      `/event-feed/top-games-wager/${max}`,
      null,
      null,
      config
    );
  }

  /**
   * Get list of top games by unique wagering customers
   */
  async getTopGamesByUWC(max: number, config?: EnjiRequestConfig) {
    return this.http.get<SkinGame[]>(
      `/event-feed/top-games-uwc/${max}`,
      null,
      null,
      config
    );
  }
}
