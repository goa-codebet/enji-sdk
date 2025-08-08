import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { ExchangeRates } from "./types";

export class ExchangeRatesClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Get rate for today, currency in ISO-4217
   *
   * Example: { "USD": 1.1747, "EUR": 1 }
   */
  async getAll(): Promise<ExchangeRates> {
    return this.http.get<ExchangeRates>("/exchange-rates");
  }
}
