export type Currency =
  | "Default"
  | "EUR"
  | "SEK"
  | "USD"
  | "BTC"
  | "NOK"
  | "CAD"
  | "AUD"
  | "CHF"
  | "CZK"
  | "NZD"
  | "PLN"
  | "GBP"
  | "DKK"
  | "BRL"
  | "JPY"
  | "INR"
  | "PEN"
  | "CLP"
  | "MXN"
  | "THB"
  | "ZAR"
  | "RON";

export type Jurisdiction =
  | "MGA"
  | "UK"
  | "DGA"
  | "SGA"
  | "ES"
  | "MX"
  | "Curacao";

export type Gender = "Male" | "Female" | "Other";

export type Platform = "Web" | "Mobile" | "Desktop";

export type Product =
  | "Payment"
  | "Bonus"
  | "Manual"
  | "Imported"
  | "TainImport"
  | "CashBack"
  | "DepositLimitIncrease"
  | "Casino"
  | "Bingo"
  | "Sportsbook"
  | "ScoutFantasy"
  | "PoolBetting"
  | "Poker"
  | "Lotto";

export type Marketing = {
  Campaign?: string;
  Source?: string;
  Medium?: string;
  Referer?: string;
};

export type LoginPageType =
  | "NoPageRequired"
  | "SourceOfWealthFormRequired"
  | "KycProvideDocuments"
  | "KycRemindAboutDocuments"
  | "ResponsibleGamingInformation"
  | "ResponsibleGamingTest"
  | "DepositLimitsRequired"
  | "UpdatePlayerInfo"
  | "TermsAndConditions"
  | "ExpectedAnnualActivity"
  | "RealityCheck";

export type RealityCheckSelection = "Logout" | "ContinuePlaying";

export type LoginPage = {
  Id: number;
  PlayerId: number;
  Created: string;
  PageType: LoginPageType;
  ForceAction: boolean;
  WasDisplayed?: string;
  RealityCheckSelection: RealityCheckSelection;
};
