import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { AddSourceOfWealthFormParams, KycDocument, KycReport } from "./types";

export class KycClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Creates a new KYC document with specified type and image.
   *
   * Supports bmp, jpeg, png and tiff but all images are converted to jpeg on server side.
   *
   * Requires session
   */
  async uploadDocument(document: KycDocument) {
    return this.http.post("/kyc/upload", document, this.sessionId);
  }

  /**
   * Gets status, type and reason for all KYC documents sent in by player.
   *
   * Requires session
   */
  async getDocuments() {
    return this.http.get<KycReport[]>("/kyc", null, this.sessionId);
  }

  /**
   * Add Source Of Wealth Forms with range of income.
   *
   * IncomeToValue will automatically be set to the players active annual income.
   *
   * Requires session
   */
  async addSourceOfWealthFormV2(params: AddSourceOfWealthFormParams) {
    return this.http.post("/kyc/source-of-wealth/v2", params, this.sessionId);
  }
}
