import {
  Currency,
  Gender,
  Jurisdiction,
  LoginPageType,
  Marketing,
  Platform,
} from "@/api/types";
import { AddLimit } from "../ResponsibleGamingLimitClient/types";

export type PlayerOptInOutType =
  | "Bonus"
  | "BonusEmails"
  | "BonusSMSs"
  | "NewsEmails"
  | "NewsSMSs"
  | "Phone"
  | "PushNotifications"
  | "Casino"
  | "Sportsbook";

export type SignUpIssue =
  | "ExternalKycVerification"
  | "GamblingIssuesCrossBrand"
  | "CrossBrandClosure"
  | "FraudAbuse"
  | "DuplicateAccount"
  | "TimeoutIssuesCrossBrand";

export type SignUpParams = {
  Username?: string;
  Password: string;
  Email: string;
  NickName?: string;
  BirthDate: string;
  FirstName?: string;
  LastName?: string;
  LastName2?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  Zip?: string;
  Region?: string;
  Country?: string;
  Nationality?: string;
  PhoneNumber?: string;
  MobilePhoneNumber?: string;
  Language: string;
  Gender?: Gender;
  Currency: Currency;
  ReceiveNewsletters?: boolean;
  ReceiveOffers?: boolean;
  PromoCode?: string;
  AffiliateTag?: string;
  Platform: Platform;
  Jurisdiction: Jurisdiction;
  TacVersionAccepted?: string;
  PersonId?: string;
  PersonIdSupportNumber?: string;
  Limits?: AddLimit[];
  OptIns?: PlayerOptInOutType[];
  DontSendActivationCode: boolean;
  OperatingSystem?: string;
  Browser?: string;
  AppVersion?: string;
  IsQuickSignup?: boolean;
  ExpectedAnnualActivityFrom?: number;
  ExpectedAnnualActivityTo?: number;
  Marketing?: Marketing;
};

export type SignUpResponse = {
  PlayerId: number;
  Issues?: SignUpIssue[];
};

export type SignUpCodeParams = {
  Code: string;
  RedirectUrl: string;
  State: string;
  FirstName?: string;
  LastName?: string;
  PersonId?: string;
  Address1?: string;
  City?: string;
  Zip?: string;
  BirthDate: string;
  Gender?: Gender;
  Username?: string;
  Password?: string;
  Email: string;
  MobilePhoneNumber?: string;
  Language: string;
  Currency: Currency;
  Country: string;
  Platform: Platform;
  Jurisdiction: Jurisdiction;
  TacVersionAccepted?: string;
  Limits?: AddLimit[];
  PromoCode?: string;
  ReceiveNewsletters?: boolean;
  ReceiveOffers?: boolean;
  AffiliateTag?: string;
  OperatingSystem?: string;
  Browser?: string;
  AppVersion?: string;
  OptIns?: PlayerOptInOutType[];
  ExpectedAnnualActivityFrom?: number;
  ExpectedAnnualActivityTo?: number;
  Marketing?: Marketing;
};

export type SignUpCodeResponse = {
  PlayerId: number;
  Issues?: SignUpIssue[];
  SessionId?: string;
  TacVersionAccepted?: string;
};

export type SignUpTokenparams = {
  JwtTokenString: string;
  Jurisdiction: Jurisdiction;
  Email: string;
  Platform: Platform;
  OperatingSystem?: string;
  Browser?: string;
  Username?: string;
  Country: string;
  Language: string;
  MobilePhoneNumber?: string;
  PromoCode?: string;
  ReceiveNewsletters?: boolean;
  ReceiveOffers?: boolean;
  AffiliateTag?: string;
  TacVersionAccepted?: string;
  Limits?: AddLimit[];
  OptIns?: PlayerOptInOutType[];
  ExpectedAnnualActivityFrom?: number;
  ExpectedAnnualActivityTo?: number;
  Marketing?: Marketing;
};

export type SignUpTokenResponse = {
  PlayerId: number;
  Issues?: SignUpIssue[];
  SessionId?: string;
  TacVersionAccepted?: string;
};

export type UpdatePlayerInfoParams = {
  Password: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  Zip?: string;
  PhoneNumber?: string;
  MobilePhoneNumber?: string;
  Language: string;
  ReceiveNewsletters?: boolean;
  ReceiveOffers?: boolean;
  Country?: string;
  Gender?: Gender;
};

export type PlayerLevel =
  | "Standard"
  | "VIP"
  | "BonusAbuser"
  | "BonusHunter"
  | "BonusDriven"
  | "AdvantagePlayer"
  | "PotentialVIP"
  | "GamblingIssuesClosed"
  | "FraudAbuse"
  | "TestAccount"
  | "Timeout"
  | "CrossBrandClosure"
  | "LowLimit"
  | "AllPaymentMethods"
  | "SuperVIP"
  | "MigrationOptOut"
  | "WithdrawWagerCheck"
  | "DepositStandard"
  | "UnderInvestigation"
  | "BonusMaxWagerExceeded"
  | "PreventAutoWD"
  | "Whitelisted";

export type SowStatus =
  | "Unverified"
  | "Verified"
  | "Requested"
  | "TimeoutBlocked";

export type PlayerInfo = {
  Id: number;
  Email?: string;
  Nickname?: string;
  BirthDate: string;
  FirstName?: string;
  LastName?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  Zip?: string;
  Country?: string;
  PhoneNumber?: string;
  MobilePhoneNumber?: string;
  Language?: string;
  Gender?: Gender | "Unknown";
  Currency?: Currency;
  signUpCurrency?: Currency;
  IsComplete: boolean;
  IsVerified: boolean;
  FirstDeposit?: string;
  LastDeposit?: string;
  DepositCount: number;
  FirstWithdrawal?: string;
  LastWithdrawal?: string;
  WithdrawalCount: number;
  AffiliateTag?: string;
  Jurisdiction?: Jurisdiction;
  PersonId?: string;
  Level: PlayerLevel;
  Tags?: string[];
  SowStatus: SowStatus;
  TacVersionAccepted?: string;
};

export type SignInParams = {
  Username: string;
  Password: string;
  Platform: Platform;
  OperatingSystem?: string;
  Browser?: string;
  UserAgent?: string;
  AppVersion?: string;
  Jurisdiction: Jurisdiction;
  Marketing?: Marketing;
};

// saknar typer i dokumentationen
export type SignInResponse = {
  SessionId: string;
};

export type SignInCodeParams = {
  Code: string;
  RedirectUrl: string;
  State: string;
  Platform: Platform;
  OperatingSystem?: string;
  Browser?: string;
  AppVersion?: string;
  Marketing?: Marketing;
};

export type SignInCodeResponse =
  | {
      SessionId: string;
    }
  | {
      JwtTokenSignUp: string;
    };

export type SignInSmsParams = {
  Otp: string;
  MobileNumber: string;
  Platform: Platform;
  OperatingSystem?: string;
  Browser?: string;
  AppVersion?: string;
  Marketing?: Marketing;
};

export type SignInSmsResponse =
  | {
      SessionId: string;
    }
  | {
      JwtTokenSignUp: string;
    };

export type CreateSSOTokenParams = {
  TokenType?: string;
};

export type RequestPasswordResetParams = {
  UsernameOrEmail: string;
};

export type ResetPasswordParams = {
  UsernameOrEmail: string;
  Token: string;
  NewPassword: string;
};

export type ActivationCodeProvider = "All" | "Email" | "Sms";

export type RequestActivationCodeParams = {
  UsernameOrEmail: string;
  Provider: ActivationCodeProvider;
};

export type DeviceDetails = {
  Platform: Platform;
  OperatingSystem?: string;
  Browser?: string;
  UserAgent?: string;
  AppVersion?: string;
};

export type ActivateAccountParams = {
  UsernameOrEmail: string;
  Code: string;
  DeviceDetails: DeviceDetails;
};

export type DisplayPage = {
  Page: LoginPageType;
  ForceAction: boolean;
};

export type ActivateAccountResponse = {
  SessionId?: string;
  TacVersionAccepted?: string;
  DisplayPage?: DisplayPage;
};

export type PaymentStatsPerBrand = {
  PlayerId: number;
  Brand?: string;
  FirstDeposit?: string;
  LastDeposit?: string;
  DepositCount: number;
  TotalDeposit: number;
  FirstWithdrawal?: string;
  LastWithdrawal?: string;
  WithdrawalCount: number;
  TotalWithdrawal: number;
  LastDepositAmount?: number;
};

export type PaymentStatsResponse = {
  FirstDeposit?: string;
  LastDeposit?: string;
  DepositCount: number;
  TotalDeposit: number;
  TotalDepositLast7Days?: number;
  FirstWithdrawal?: string;
  LastWithdrawal?: string;
  WithdrawalCount: number;
  TotalWithdrawal: number;
  LastDepositAmount?: number;
  PerBrandStats?: PaymentStatsPerBrand[];
};

export type LifetimeStatsResponse = {
  NGR: number;
};

export type OptInOut = {
  Type: PlayerOptInOutType;
  TypeId: string;
  OptIn: boolean;
};

export type OptInOutResponse = OptInOut[];

export type OptOutInResponse = OptInOut[];

export type OptInParams = {
  Type: PlayerOptInOutType;
};

export type OptOutParams = {
  Type: PlayerOptInOutType;
};

export type OptOutChoicesParams = {
  OptOutToken: string;
  OptInTypes: PlayerOptInOutType[];
};

export type TournamentOptInParams = {
  PlayerId: number;
  TournamentIdentifier: string;
};
