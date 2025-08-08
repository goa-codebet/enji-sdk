import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";

export class CurrenciesClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Get all currencies
   */
  async getCurrencies(): Promise<string[]> {
    return this.http.get<string[]>("/currencies");
  }

  /**
   * Get all active display currencies that are currently enabled on the skin
   */
  async getDisplayCurrencies(): Promise<string[]> {
    return this.http.get<string[]>("/currencies/display");
  }
}
