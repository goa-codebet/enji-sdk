import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
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
  async getBalance(
    sessionId: string,
    params?: GetBalanceParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<BalanceSheet>(`/wallet`, params, sessionId, config);
  }

  /**
   * Gets a summary of the players current balance / reserved balance per currency
   *
   * Requires session
   */
  async getAllBalances(
    sessionId: string,
    params?: GetAllBalancesParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<PerCurrencyBalanceSheet>(
      "/wallets",
      params,
      sessionId,
      config
    );
  }
}
