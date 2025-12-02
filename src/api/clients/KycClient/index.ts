import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import { AddSourceOfWealthFormParams, KycDocument, KycReport } from "./types";

export class KycClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Creates a new KYC document with specified type and image.
   *
   * Supports bmp, jpeg, png and tiff but all images are converted to jpeg on server side.
   *
   * Requires session
   */
  async uploadDocument(
    sessionId: string,
    document: KycDocument,
    config?: EnjiRequestConfig
  ) {
    return this.http.post("/kyc/upload", document, sessionId, config);
  }

  /**
   * Gets status, type and reason for all KYC documents sent in by player.
   *
   * Requires session
   */
  async getDocuments(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<KycReport[]>("/kyc", null, sessionId, config);
  }

  /**
   * Add Source Of Wealth Forms with range of income.
   *
   * IncomeToValue will automatically be set to the players active annual income.
   *
   * Requires session
   */
  async addSourceOfWealthFormV2(
    sessionId: string,
    params: AddSourceOfWealthFormParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post(
      "/kyc/source-of-wealth/v2",
      params,
      sessionId,
      config
    );
  }
}
