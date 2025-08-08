import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import {
  BalanceSheet,
  GetAllBalancesParams,
  GetBalanceParams,
  PerCurrencyBalanceSheet,
} from "./types";

export class WalletClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Gets a summary of the players current balance / reserved balance for a specific currency.
   *
   * Requires session
   */
  async getBalance(params?: GetBalanceParams): Promise<BalanceSheet> {
    return this.http.get(`/wallet`, params, this.sessionId);
  }

  /**
   * Gets a summary of the players current balance / reserved balance per currency
   *
   * Requires session
   */
  async getAllBalances(
    params?: GetAllBalancesParams
  ): Promise<PerCurrencyBalanceSheet> {
    return this.http.get("/wallets", params, this.sessionId);
  }
}
