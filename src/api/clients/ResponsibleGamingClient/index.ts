import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import {
  AddPsgiScoreParams,
  PanicParams,
  ProductBlock,
  RealityCheckData,
  SessionInfo,
} from "./types";

export class ResponsibleGamingClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Calculates and returns how many minutes that is left until a reality check
   *
   * Requires session
   */
  async getSession(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<SessionInfo>(
      "/responsiblegaming/session",
      null,
      sessionId,
      config
    );
  }

  /**
   * Requires session
   */
  async panic(
    params: PanicParams,
    sessionId: string,
    config?: EnjiRequestConfig
  ) {
    return this.http.post(
      "/responsiblegaming/panic",
      params,
      sessionId,
      config
    );
  }

  /**
   * Add PSGI score for player.
   * Session limits need frontend support to limit the active game session length
   *
   * Requires session
   */
  async addPsgiScore(
    params: AddPsgiScoreParams,
    sessionId: string,
    config?: EnjiRequestConfig
  ) {
    return this.http.post(
      "/responsiblegaming/pgsi-score",
      params,
      sessionId,
      config
    );
  }

  /**
   * Add a self exclusion on the player.
   * The player will be signed out and unable to login until the exclusion expires
   *
   * Requires session
   */
  async addSelfExclude(
    sessionId: string,
    expiresIn: number,
    config?: EnjiRequestConfig
  ) {
    return this.http.post(
      `/responsiblegaming/self-exclude/${expiresIn}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Add a self block on the player.
   * The player will be signed out and unable to login until the block expires
   *
   * Requires session
   */
  async addSelfBlock(
    sessionId: string,
    expiresIn: number,
    config?: EnjiRequestConfig
  ) {
    return this.http.post(
      `/responsiblegaming/block/${expiresIn}`,
      null,
      sessionId,
      config
    );
  }

  /**
   * Get wager and win for the products casino, sportsbook, lotto and poolbetting
   *
   * Requires session
   */
  async getRealityCheckData(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<RealityCheckData>(
      "/responsiblegaming/realitycheck-data",
      null,
      sessionId,
      config
    );
  }

  /**
   * Get all active product blocks
   *
   * Requires session
   */
  async getProductBlocks(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<ProductBlock[]>(
      "/responsiblegaming/product-blocks",
      null,
      sessionId,
      config
    );
  }
}
