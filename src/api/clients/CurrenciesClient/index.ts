import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";

export class CurrenciesClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get all currencies
   */
  async getCurrencies(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<string[]>("/currencies", null, sessionId, config);
  }

  /**
   * Get all active display currencies that are currently enabled on the skin
   */
  async getDisplayCurrencies(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<string[]>(
      "/currencies/display",
      null,
      sessionId,
      config
    );
  }
}
