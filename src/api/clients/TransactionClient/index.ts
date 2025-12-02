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
    sessionId: string,
    params?: GetPaymentsParams,
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
    sessionId: string,
    params?: GetGamePlayTransactionsParams,
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
    sessionId: string,
    params?: GetSportsbookBetsParams,
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
