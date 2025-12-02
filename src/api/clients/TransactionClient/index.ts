import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import {
  GameTransaction,
  GetGamePlayTransactionsParams,
  GetPaymentsParams,
  GetSportsbookBetsParams,
  PaymentTransaction,
  SportsbookBet,
} from "./types";

export class TransactionClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get all payments
   *
   * Requires session
   */
  async getPayments(
    params?: GetPaymentsParams,
    sessionId?: string,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<PaymentTransaction>(
      "/transaction/payments",
      params || null,
      sessionId,
      config
    );
  }

  /**
   * Get all game play transactions
   *
   * Requires session
   */
  async getGameplayTransactions(
    params?: GetGamePlayTransactionsParams,
    sessionId?: string,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<GameTransaction>(
      "/transaction/gameplay",
      params || null,
      sessionId,
      config
    );
  }

  /**
   * Get all sportsbook transactions
   *
   * Requires session
   */
  async getSportsbookBets(
    params?: GetSportsbookBetsParams,
    sessionId?: string,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<SportsbookBet>(
      "/transaction/sportsbookbets",
      params || null,
      sessionId,
      config
    );
  }
}
