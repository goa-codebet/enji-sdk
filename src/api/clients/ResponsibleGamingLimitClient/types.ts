import { Currency, Product } from "@/api/types";
import { PgsiScoreVersion } from "../ResponsibleGamingClient/types";

export type PlayerLimitType =
  | "Deposit"
  | "NetLoss"
  | "Wager"
  | "Session"
  | "RealityCheck"
  | "LoginPeriodBlock"
  | "LoginTime"
  | "ProductSession";

export type AddLimitBase = {
  Type: PlayerLimitType;
  Product?: Product;
  StartTime?: string;
  PgsiScore?: number;
  PgsiScoreVersion?: PgsiScoreVersion;
  IsSignupLimit?: boolean;
  Currency?: Currency;
};

export type AddLimitDetails = {
  Amount: number;
  Timespan: number;
};

export type AddLimit = AddLimitBase & AddLimitDetails;

export type Limit = {
  Id: number;
  Type?: string;
  Product?: Product;
  Status?: string;
  Amount: number;
  Currency?: Currency;
  Timespan: number;
  Created: string;
  Canceled?: string;
  Expires?: string;
  Activates?: string;
  RemainingAmount: number;
  IsAdmin: boolean;
};
