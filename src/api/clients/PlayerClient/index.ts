import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { Jurisdiction, LoginPage } from "@/api/types";
import {
  ActivateAccountParams,
  ActivateAccountResponse,
  CreateSSOTokenParams,
  LifetimeStatsResponse,
  OptInOutResponse,
  OptInParams,
  OptOutChoicesParams,
  OptOutInResponse,
  OptOutParams,
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
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Register a new player in the system and creates a wallet in the supplied currency, or in the default currency if none is supplied.
   *
   * Requires client IP
   */
  async signUp(params: SignUpParams) {
    return this.http.post<SignUpResponse>("/player/signup/v2", params);
  }

  /**
   * Sign up using verification code
   */
  async signUpWithCode(params: SignUpCodeParams) {
    return this.http.post<SignUpCodeResponse>("/player/signup/code", params);
  }

  /**
   * Sign up using JWT token
   */
  async signUpWithToken(params: SignUpTokenparams) {
    return this.http.post<SignUpTokenResponse>("/player/signup/token", params);
  }

  /**
   * Validate if email is available for registration
   */
  async validateEmail(
    email: string,
    jurisdiction: Jurisdiction,
    isBouncedCheck?: boolean
  ) {
    const params: Record<string, unknown> = { email, jurisdiction };
    if (isBouncedCheck) params.isBouncedCheck = isBouncedCheck;
    return this.http.get<boolean>("/player/validate-email", params);
  }

  /**
   * Validate if username is available for registration
   */
  async validateUsername(username: string, jurisdiction: Jurisdiction) {
    const params: Record<string, unknown> = { username, jurisdiction };
    return this.http.get<boolean>("/player/validate-username", params);
  }

  /**
   * Validate phone number
   */
  async validatePhone(phoneNumber: string, jurisdiction: Jurisdiction) {
    const params: Record<string, unknown> = { phoneNumber, jurisdiction };
    return this.http.get<boolean>("/player/validate-phone", params);
  }

  /**
   * Update the current players info
   *
   * The players current password is required to authenticate the change
   *
   * Requires session
   */
  async updateInfo(params: UpdatePlayerInfoParams) {
    return this.http.post("/player/update", params, this.sessionId);
  }

  /**
   * Get all saved user details for the currently authenticated user
   *
   * Requires session
   */
  async getInfo() {
    return this.http.get<PlayerInfo>("/player/user-info", null, this.sessionId);
  }

  /**
   * Change the current authenticated users password
   *
   * The user has to reauthenticate by submitting his current password
   *
   * Requires session
   */
  async changePassword(params: {
    CurrentPassword: string;
    NewPassword: string;
  }) {
    return this.http.post("/player/change-password", params, this.sessionId);
  }

  /**
   * Sign in a player
   */
  async signIn(params: SignInParams) {
    return this.http.post("/player/signin/v2", params);
  }

  /**
   * Used for signin or as a per-step for signup
   *
   * If a registered player is not found on the brand SessionId will be null.
   * In that case the property JwtTokenSignup will have a value instead which stores playerinfo for a quicker signup.
   *
   * If PersonId could not be parsed inte Age then the age property will have a value of -1
   */
  async signInWithCode(params: SignInCodeParams) {
    return this.http.post<SignInCodeResponse>("/player/signin/code", params);
  }

  /**
   * Used for signin or as a per-step for signup
   *
   * If a registered player is not found on the brand SessionId will be null.
   * In that case the property JwtTokenSignup will have a value instead which stores playerinfo for a quicker signup.
   *
   * If PersonId could not be parsed inte Age then the age property will have a value of -1
   */
  async signInWithSms(params: SignInSmsParams) {
    return this.http.post("/player/signin/sms", params);
  }

  /**
   * Update the version of the terms and conditions that the player has accepted.
   *
   * Requires session
   */
  async updateTermsAndConditions(version: string) {
    return this.http.get(
      `/player/update-player-tac`,
      { tacVersionAccepted: version },
      this.sessionId
    );
  }

  /**
   * Invalidates the current session
   */
  async signOut() {
    return this.http.post("/player/signout", null, this.sessionId);
  }

  /**
   * Creates a single sign on token that can be used by third party products like casino games to authenticate with the back office.
   *
   * The token will only be valid for a short time but at least for five minutes.
   *
   * Requires session
   */
  async createSSOToken(params?: CreateSSOTokenParams) {
    return this.http.post<string>(
      "/player/create-sso-token",
      params,
      this.sessionId
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
  async requestPasswordReset(params: RequestPasswordResetParams) {
    return this.http.post(`/player/request-password-reset`, params);
  }

  /**
   * Resets the players password provided a password reset token and a new password.
   * The token will be destroyed upon a successful reset.
   * Parameter `UsernameOrEmail` can be either username, email or mobile number of the player.
   *
   * Requires client ip
   */
  async resetPassword(params: ResetPasswordParams) {
    return this.http.post(`/player/reset-password`, params);
  }

  /**
   * Request a new activation code for a player.
   * The code will be sent either by email or sms.
   * Parameter `UsernameOrEmail` can be either username, email or mobile number of the player.
   */
  async requestActivationCode(params: RequestActivationCodeParams) {
    return this.http.post("/player/request-activation-code", params);
  }

  /**
   * Activate the player account using a code sent to the player by email or sms.
   * If device info provided, returns signin.
   * Parameter `UsernameOrEmail` can be either username, email or mobile number of the player.
   */
  async activateAccount(params: ActivateAccountParams) {
    return this.http.post<ActivateAccountResponse>("/player/activate", params);
  }

  /**
   * Get the player payment stats.
   *
   * Requires session
   */
  async getPaymentStats() {
    return this.http.get<PaymentStatsResponse>(
      "/player/payment-stats",
      null,
      this.sessionId
    );
  }

  async getLifetimeStats() {
    return this.http.get<LifetimeStatsResponse>(
      "/player/lifetime-stats",
      null,
      this.sessionId
    );
  }

  /**
   * Get a list of all possible opt in/outs with current player status
   * Requires session
   */
  async getOptInOuts() {
    return this.http.get("/player/opt-in-outs", null, this.sessionId);
  }

  /**
   * Get a list of all possible opt in/outs for a player
   */
  async getOptOutIns(unsubToken: string) {
    return this.http.get("/player/opt-out-ins", { unsubToken });
  }

  /**
   * Opt in player to pre-defined type
   * Requires session
   */
  async optIn(params: OptInParams) {
    return this.http.post("/player/opt-in", params, this.sessionId);
  }

  /**
   * Opt out player from pre-defined type
   * Requires session
   */
  async optOut(params: OptOutParams) {
    return this.http.post("/player/opt-out", params, this.sessionId);
  }

  /**
   * If token is valid opt in the player for whats provided in the array and opt the player out for the rest.
   * Empty array opt the player out from all offers and newsletters.
   */
  async optOutChoices(params: OptOutChoicesParams) {
    return this.http.post("/player/opt-out-choices", params);
  }

  /**
   * opt in player to tournament
   *
   * Requires session
   */
  async tournamentOptIn(params: TournamentOptInParams) {
    return this.http.post("/player/tournament-opt-in", params, this.sessionId);
  }

  /**
   * Get all not displayed player login pages
   *
   * Requires session
   */
  async getPagesToDisplay() {
    return this.http.get<LoginPage[]>(
      "/player/display-pages",
      null,
      this.sessionId
    );
  }

  /**
   * Request OTP for player
   */
  async requestOTP(
    jurisdiction: Jurisdiction,
    countryCode: string,
    mobile: string
  ) {
    return this.http.get("/player/request-otp", {
      jurisdiction,
      countryCode,
      mobile,
    });
  }
}
