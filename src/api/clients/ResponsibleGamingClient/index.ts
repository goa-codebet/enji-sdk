import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import {
  AddPsgiScoreParams,
  PanicParams,
  ProductBlock,
  RealityCheckData,
  SessionInfo,
} from "./types";

export class ResponsibleGamingClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Calculates and returns how many minutes that is left until a reality check
   *
   * Requires session
   */
  async getSession(): Promise<SessionInfo> {
    return this.http.get<SessionInfo>(
      "/responsiblegaming/session",
      null,
      this.sessionId
    );
  }

  /**
   * Requires session
   */
  async panic(params: PanicParams): Promise<void> {
    return this.http.post<void>(
      "/responsiblegaming/panic",
      params,
      this.sessionId
    );
  }

  /**
   * Add PSGI score for player.
   * Session limits need frontend support to limit the active game session length
   *
   * Requires session
   */
  async addPsgiScore(params: AddPsgiScoreParams): Promise<void> {
    return this.http.post<void>(
      "/responsiblegaming/pgsi-score",
      params,
      this.sessionId
    );
  }

  /**
   * Add a self exclusion on the player.
   * The player will be signed out and unable to login until the exclusion expires
   *
   * Requires session
   */
  async addSelfExclude(expiresIn: number): Promise<void> {
    return this.http.post<void>(
      `/responsiblegaming/self-exclude/${expiresIn}`,
      null,
      this.sessionId
    );
  }

  /**
   * Add a self block on the player.
   * The player will be signed out and unable to login until the block expires
   *
   * Requires session
   */
  async addSelfBlock(expiresIn: number): Promise<void> {
    return this.http.post<void>(
      `/responsiblegaming/block/${expiresIn}`,
      null,
      this.sessionId
    );
  }

  /**
   * Get wager and win for the products casino, sportsbook, lotto and poolbetting
   *
   * Requires session
   */
  async getRealityCheckData(): Promise<RealityCheckData> {
    return this.http.get<RealityCheckData>(
      "/responsiblegaming/reality-check-data",
      null,
      this.sessionId
    );
  }

  /**
   * Get all active product blocks
   *
   * Requires session
   */
  async getProductBlocks(): Promise<ProductBlock[]> {
    return this.http.get<ProductBlock[]>(
      "/responsiblegaming/product-blocks",
      null,
      this.sessionId
    );
  }
}
