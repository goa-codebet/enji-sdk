import { Http } from "@/api/Http";
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
  async getPayments(params?: GetPaymentsParams) {
    return this.http.get<PaymentTransaction>(
      "/transaction/payments",
      params || null,
      sessionId
    );
  }

  /**
   * Get all game play transactions
   *
   * Requires session
   */
  async getGameplayTransactions(params?: GetGamePlayTransactionsParams) {
    return this.http.get<GameTransaction>(
      "/transaction/gameplay",
      params || null,
      sessionId
    );
  }

  /**
   * Get all sportsbook transactions
   *
   * Requires session
   */
  async getSportsbookBets(params?: GetSportsbookBetsParams) {
    return this.http.get<SportsbookBet>(
      "/transaction/sportsbookbets",
      params || null,
      sessionId
    );
  }
}
