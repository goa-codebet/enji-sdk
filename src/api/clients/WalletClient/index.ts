import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import {
  BalanceSheet,
  GetAllBalancesParams,
  GetBalanceParams,
  PerCurrencyBalanceSheet,
} from "./types";

export class WalletClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Gets a summary of the players current balance / reserved balance for a specific currency.
   *
   * Requires session
   */
  async getBalance(params?: GetBalanceParams) {
    return this.http.get<BalanceSheet>(`/wallet`, params, sessionId);
  }

  /**
   * Gets a summary of the players current balance / reserved balance per currency
   *
   * Requires session
   */
  async getAllBalances(params?: GetAllBalancesParams) {
    return this.http.get<PerCurrencyBalanceSheet>(
      "/wallets",
      params,
      sessionId
    );
  }
}
