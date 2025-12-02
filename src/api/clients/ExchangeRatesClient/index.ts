import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import { ExchangeRates } from "./types";

export class ExchangeRatesClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get rate for today, currency in ISO-4217
   *
   * Example: { "USD": 1.1747, "EUR": 1 }
   */
  async getAll(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<ExchangeRates>(
      "/exchange-rates",
      null,
      sessionId,
      config
    );
  }
}
