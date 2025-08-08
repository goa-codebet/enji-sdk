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

export type AddLimit = {
  Type: PlayerLimitType;
  Product: Product;
  StartTime?: string;
  PgsiScore?: number;
  PgsiScoreVersion?: PgsiScoreVersion;
  IsSignupLimit?: boolean;
  Currency?: Currency;
  Amount: number;
  Timespan?: number;
};

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
