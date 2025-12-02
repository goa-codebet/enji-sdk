import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { BonusInstance, BonusOffer, OfferType, PendingBonus } from "./types";

export class BonusClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get a list of all bonuses (pending, active, expired, cleared)
   * Requires session
   */
  async getAll(sessionId: string) {
    return this.http.get<BonusInstance[]>("/bonus", null, sessionId);
  }

  /**
   * Get a list of all freespins (excluding pending)
   *
   * BonusAmount is the number of freespins awarded until they have been played at which point the value is the amount won on the freespins
   *
   * Requires session
   */
  async getFreeSpins(sessionId: string) {
    return this.http.get<BonusInstance[]>("/bonus/free-spins", null, sessionId);
  }

  /**
   * Get a list of all monetary bonuses (excluding pending)
   *
   * Requires session
   */
  async getMonetary(sessionId: string) {
    return this.http.get<BonusInstance[]>("/bonus/monetary", null, sessionId);
  }

  /**
   * Get a list of all pending bonuses
   *
   * Requires session
   */
  async getPending(sessionId: string) {
    return this.http.get<PendingBonus[]>("/bonus/pending", null, sessionId);
  }

  /**
   * Get detailed information for a specific bonus
   *
   * Requires session
   */
  async get(sessionId: string, bonusId: number) {
    return this.http.get<BonusInstance>(`/bonus/${bonusId}`, null, sessionId);
  }

  /**
   * Claim a pending bonus
   *
   * Requires session
   */
  async claim(sessionId: string, bonusId: number) {
    return this.http.post(`/bonus/${bonusId}/claim`, null, sessionId);
  }

  /**
   * Reject a pending bonus
   *
   * Requires session
   */
  async reject(sessionId: string, bonusId: number) {
    return this.http.post(`/bonus/${bonusId}/reject`, null, sessionId);
  }

  /**
   * Cancel an active bonus
   *
   * This will clear the connected bonus wallet and remove the funds from the player
   *
   * Requires session
   */
  async cancel(sessionId: string, bonusId: number) {
    return this.http.post(`/bonus/${bonusId}/cancel`, null, sessionId);
  }

  /**
   * Preclaim a bonus using a promo code
   *
   * Requires session
   */
  async preclaim(sessionId: string, promoCode: string) {
    return this.http.post<number>(
      `/bonus/preclaim/${promoCode}`,
      null,
      sessionId
    );
  }

  /**
   * Trigger a bonus manually using a promo code
   *
   * The bonus has to be configured with the trigger type PromotionCode
   *
   * Requires session
   */
  async trigger(sessionId: string, promoCode: string) {
    return this.http.post<number>(
      `/bonus/trigger/${promoCode}`,
      null,
      sessionId
    );
  }

  /**
   * Get a list of all available offers for a specific trigger type
   *
   * Note: Currently only type `Deposit` is supported
   *
   * Requires session
   */
  async getOffers(sessionId: string, type: OfferType) {
    return this.http.get<BonusOffer[]>("/bonus/offers", { type }, sessionId);
  }
}
