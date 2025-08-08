import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { BonusInstance, BonusOffer, OfferType, PendingBonus } from "./types";

export class BonusClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Get a list of all bonuses (pending, active, expired, cleared)
   * Requires session
   */
  async getAll() {
    return this.http.get<BonusInstance[]>("/bonus", null, this.sessionId);
  }

  /**
   * Get a list of all freespins (excluding pending)
   *
   * BonusAmount is the number of freespins awarded until they have been played at which point the value is the amount won on the freespins
   *
   * Requires session
   */
  async getFreeSpins() {
    return this.http.get<BonusInstance[]>(
      "/bonus/free-spins",
      null,
      this.sessionId
    );
  }

  /**
   * Get a list of all monetary bonuses (excluding pending)
   *
   * Requires session
   */
  async getMonetary() {
    return this.http.get<BonusInstance[]>(
      "/bonus/monetary",
      null,
      this.sessionId
    );
  }

  /**
   * Get a list of all pending bonuses
   *
   * Requires session
   */
  async getPending() {
    return this.http.get<PendingBonus[]>(
      "/bonus/pending",
      null,
      this.sessionId
    );
  }

  /**
   * Get detailed information for a specific bonus
   *
   * Requires session
   */
  async get(bonusId: number) {
    return this.http.get<BonusInstance>(
      `/bonus/${bonusId}`,
      null,
      this.sessionId
    );
  }

  /**
   * Claim a pending bonus
   *
   * Requires session
   */
  async claim(bonusId: number) {
    return this.http.post(`/bonus/${bonusId}/claim`, null, this.sessionId);
  }

  /**
   * Reject a pending bonus
   *
   * Requires session
   */
  async reject(bonusId: number) {
    return this.http.post(`/bonus/${bonusId}/reject`, null, this.sessionId);
  }

  /**
   * Cancel an active bonus
   *
   * This will clear the connected bonus wallet and remove the funds from the player
   *
   * Requires session
   */
  async cancel(bonusId: number) {
    return this.http.post(`/bonus/${bonusId}/cancel`, null, this.sessionId);
  }

  /**
   * Preclaim a bonus using a promo code
   *
   * Requires session
   */
  async preclaim(promoCode: string) {
    return this.http.post<number>(
      `/bonus/preclaim/${promoCode}`,
      null,
      this.sessionId
    );
  }

  /**
   * Trigger a bonus manually using a promo code
   *
   * The bonus has to be configured with the trigger type PromotionCode
   *
   * Requires session
   */
  async trigger(promoCode: string) {
    return this.http.post<number>(
      `/bonus/trigger/${promoCode}`,
      null,
      this.sessionId
    );
  }

  /**
   * Get a list of all available offers for a specific trigger type
   *
   * Note: Currently only type `Deposit` is supported
   *
   * Requires session
   */
  async getOffers(type: OfferType) {
    return this.http.get<BonusOffer[]>(
      "/bonus/offers",
      { type },
      this.sessionId
    );
  }
}
