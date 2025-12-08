import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import { Jurisdiction, LoginPage } from "@/api/types";
import {
  ActivateAccountParams,
  ActivateAccountResponse,
  CreateSSOTokenParams,
  LifetimeStatsResponse,
  OptInOut,
  OptInOutParams,
  OptOutChoicesParams,
  PaymentStatsResponse,
  PlayerInfo,
  RequestActivationCodeParams,
  RequestPasswordResetParams,
  ResetPasswordParams,
  SignInCodeParams,
  SignInCodeResponse,
  SignInParams,
  SignInResponse,
  SignInSmsParams,
  SignInSmsResponse,
  SignUpCodeParams,
  SignUpCodeResponse,
  SignUpParams,
  SignUpResponse,
  SignUpTokenparams,
  SignUpTokenResponse,
  TournamentOptInParams,
  UpdatePlayerInfoParams,
} from "./types";

export class PlayerClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Register a new player in the system and creates a wallet in the supplied currency, or in the default currency if none is supplied.
   *
   * Requires client IP
   */
  async signUp(params: SignUpParams, config?: EnjiRequestConfig) {
    return this.http.post<SignUpResponse>(
      "/player/signup/v2",
      params,
      null,
      config
    );
  }

  /**
   * Sign up using verification code
   */
  async signUpWithCode(params: SignUpCodeParams, config?: EnjiRequestConfig) {
    return this.http.post<SignUpCodeResponse>(
      "/player/signup/code",
      params,
      null,
      config
    );
  }

  /**
   * Sign up using JWT token
   */
  async signUpWithToken(params: SignUpTokenparams, config?: EnjiRequestConfig) {
    return this.http.post<SignUpTokenResponse>(
      "/player/signup/token",
      params,
      null,
      config
    );
  }

  /**
   * Validate if email is available for registration
   */
  async validateEmail(
    email: string,
    jurisdiction: Jurisdiction,
    isBouncedCheck?: boolean,
    config?: EnjiRequestConfig
  ) {
    const params: Record<string, unknown> = { email, jurisdiction };
    if (isBouncedCheck) params.isBouncedCheck = isBouncedCheck;
    return this.http.get<boolean>(
      "/player/validate-email",
      params,
      null,
      config
    );
  }

  /**
   * Validate if username is available for registration
   */
  async validateUsername(
    username: string,
    jurisdiction: Jurisdiction,
    config?: EnjiRequestConfig
  ) {
    const params: Record<string, unknown> = { username, jurisdiction };
    return this.http.get<boolean>(
      "/player/validate-username",
      params,
      null,
      config
    );
  }

  /**
   * Validate phone number
   */
  async validatePhone(
    params: { phoneNumber: string; jurisdiction: Jurisdiction },
    config?: EnjiRequestConfig
  ) {
    return this.http.get<boolean>(
      "/player/validate-phone",
      params,
      null,
      config
    );
  }

  /**
   * Update the current players info
   *
   * The players current password is required to authenticate the change
   *
   * Requires session
   */
  async updateInfo(
    sessionId: string,
    params: UpdatePlayerInfoParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post("/player/update", params, sessionId, config);
  }

  /**
   * Get all saved user details for the currently authenticated user
   *
   * Requires session
   */
  async getInfo(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<PlayerInfo>(
      "/player/user-info",
      null,
      sessionId,
      config
    );
  }

  /**
   * Change the current authenticated users password
   *
   * The user has to reauthenticate by submitting his current password
   *
   * Requires session
   */
  async changePassword(
    sessionId: string,
    params: {
      CurrentPassword: string;
      NewPassword: string;
    },
    config?: EnjiRequestConfig
  ) {
    return this.http.post("/player/change-password", params, sessionId, config);
  }

  /**
   * Sign in a player
   */
  async signIn(params: SignInParams, config?: EnjiRequestConfig) {
    return this.http.post<SignInResponse>(
      "/player/signin/v2",
      params,
      null,
      config
    );
  }

  /**
   * Used for signin or as a per-step for signup
   *
   * If a registered player is not found on the brand SessionId will be null.
   * In that case the property JwtTokenSignup will have a value instead which stores playerinfo for a quicker signup.
   *
   * If PersonId could not be parsed inte Age then the age property will have a value of -1
   */
  async signInWithCode(params: SignInCodeParams, config?: EnjiRequestConfig) {
    return this.http.post<SignInCodeResponse>(
      "/player/signin/code",
      params,
      null,
      config
    );
  }

  /**
   * Used for signin or as a per-step for signup
   *
   * If a registered player is not found on the brand SessionId will be null.
   * In that case the property JwtTokenSignup will have a value instead which stores playerinfo for a quicker signup.
   *
   * If PersonId could not be parsed inte Age then the age property will have a value of -1
   */
  async signInWithSms(params: SignInSmsParams, config?: EnjiRequestConfig) {
    return this.http.post<SignInSmsResponse>(
      "/player/signin/sms",
      params,
      null,
      config
    );
  }

  /**
   * Update the version of the terms and conditions that the player has accepted.
   *
   * Requires session
   */
  async updateTermsAndConditions(
    sessionId: string,
    version: string,
    config?: EnjiRequestConfig
  ) {
    return this.http.get(
      `/player/update-player-tac`,
      { tacVersionAccepted: version },
      sessionId,
      config
    );
  }

  /**
   * Invalidates the current session
   */
  async signOut(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.post("/player/signout", null, sessionId, config);
  }

  /**
   * Creates a single sign on token that can be used by third party products like casino games to authenticate with the back office.
   *
   * The token will only be valid for a short time but at least for five minutes.
   *
   * Requires session
   */
  async createSSOToken(
    sessionId: string,
    params?: CreateSSOTokenParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post<string>(
      "/player/create-sso-token",
      params,
      sessionId,
      config
    );
  }

  /**
   * Initiates the password reset procedure
   *
   * A link that allows the player to reset his password will be emailed to him.
   * The url is set in the Aleacc admin and the following query string will be added to it `token=xxx` where token should be passed to the `resetPassword` method together with the users new password.
   * The token is only valid for one hour and is destroyed upon usage. Parameter `UsernameOrEmail` can be either username, email or mobile number of the player.
   *
   * Requires client ip
   */
  async requestPasswordReset(
    params: RequestPasswordResetParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post(
      `/player/request-password-reset`,
      params,
      null,
      config
    );
  }

  /**
   * Resets the players password provided a password reset token and a new password.
   * The token will be destroyed upon a successful reset.
   * Parameter `UsernameOrEmail` can be either username, email or mobile number of the player.
   *
   * Requires client ip
   */
  async resetPassword(params: ResetPasswordParams, config?: EnjiRequestConfig) {
    return this.http.post(`/player/reset-password`, params, null, config);
  }

  /**
   * Request a new activation code for a player.
   * The code will be sent either by email or sms.
   * Parameter `UsernameOrEmail` can be either username, email or mobile number of the player.
   */
  async requestActivationCode(
    params: RequestActivationCodeParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post(
      "/player/request-activation-code",
      params,
      null,
      config
    );
  }

  /**
   * Activate the player account using a code sent to the player by email or sms.
   * If device info provided, returns signin.
   * Parameter `UsernameOrEmail` can be either username, email or mobile number of the player.
   */
  async activateAccount(
    params: ActivateAccountParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post<ActivateAccountResponse>(
      "/player/activate",
      params,
      null,
      config
    );
  }

  /**
   * Get the player payment stats.
   *
   * Requires session
   */
  async getPaymentStats(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<PaymentStatsResponse>(
      "/player/payment-stats",
      null,
      sessionId,
      config
    );
  }

  async getLifetimeStats(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<LifetimeStatsResponse>(
      "/player/lifetime-stats",
      null,
      sessionId,
      config
    );
  }

  /**
   * Get a list of all possible opt in/outs with current player status
   * Requires session
   */
  async getOptInOuts(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<OptInOut[]>(
      "/player/opt-in-outs",
      null,
      sessionId,
      config
    );
  }

  /**
   * Get a list of all possible opt in/outs for a player
   */
  async getOptOutIns(unsubToken: string, config?: EnjiRequestConfig) {
    return this.http.get<OptInOut[]>(
      "/player/opt-out-ins",
      {
        unsubToken,
      },
      null,
      config
    );
  }

  /**
   * Opt in player to pre-defined type
   * Requires session
   */
  async optIn(
    sessionId: string,
    params: OptInOutParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post("/player/opt-in", params, sessionId, config);
  }

  /**
   * Opt out player from pre-defined type
   * Requires session
   */
  async optOut(
    sessionId: string,
    params: OptInOutParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post("/player/opt-out", params, sessionId, config);
  }

  /**
   * If token is valid opt in the player for whats provided in the array and opt the player out for the rest.
   * Empty array opt the player out from all offers and newsletters.
   */
  async optOutChoices(params: OptOutChoicesParams, config?: EnjiRequestConfig) {
    return this.http.post("/player/opt-out-choices", params, null, config);
  }

  /**
   * opt in player to tournament
   *
   * Requires session
   */
  async tournamentOptIn(
    sessionId: string,
    params: TournamentOptInParams,
    config?: EnjiRequestConfig
  ) {
    return this.http.post(
      "/player/tournament-opt-in",
      params,
      sessionId,
      config
    );
  }

  /**
   * Get all not displayed player login pages
   *
   * Requires session
   */
  async getPagesToDisplay(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<LoginPage[]>(
      "/player/display-pages",
      null,
      sessionId,
      config
    );
  }

  /**
   * Request OTP for player
   */
  async requestOTP(
    params: {
      jurisdiction: Jurisdiction;
      countryCode: string;
      mobile: string;
    },
    config?: EnjiRequestConfig
  ) {
    return this.http.get("/player/request-otp", params, null, config);
  }
}
