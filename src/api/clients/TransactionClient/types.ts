import { Currency, Product } from "@/api/types";

export type GetPaymentsParams = {
  offset?: number;
  max?: number;
  type?: "withdraw" | "deposit";
};

export type Transaction = {
  Id: number;
  Amount: number;
  Status?: string;
  Started: string;
  Ended?: string;
  Children?: Transaction[];
  Currency?: Currency;
  WalletType?: string;
  TransactionType?: string;
  Product?: Product;
  Method?: string;
};

export type PaymentTransaction = Transaction & {
  Provider?: string;
  RemoteTransactionId?: string;
  BonusCode?: string;
};

export type GetGamePlayTransactionsParams = {
  offset?: number;
  max?: number;
};

export type GameTransaction = {
  RoundId: number;
  StartTime: string;
  EndTime?: string;
  Currency?: Currency;
  Bet: number;
  Win: number;
  Transactions: Transaction[];
  Game?: string;
  GameId: number;
};

export type GetSportsbookBetsParams = {
  offset?: number;
  max?: number;
};

export type SportsbookProvider =
  | "MetricGaming"
  | "SBTech"
  | "DeltaGaming"
  | "BetConstruct"
  | "Betby"
  | "Betsson"
  | "NSoft";

export type SportsbookTransactionType =
  | "Wager"
  | "Win"
  | "End"
  | "Cancel"
  | "Reverse"
  | "Line"
  | "Settlement"
  | "FreeBetPayout"
  | "Commit"
  | "Rollback";

export type SportsbookTransactionStatus = "Default" | "Reversed" | "Canceled";

export type SportsbookBetTransaction = {
  Subreference?: string;
  Type: SportsbookTransactionType;
  Amount: number;
  Description?: string;
  Status: SportsbookTransactionStatus;
  Odds: number;
};

export type SportsbookBet = {
  Id: number;
  Provider: SportsbookProvider;
  Reference?: string;
  TotalWager: number;
  TotalWin: number;
  Created: string;
  Settled: string;
  Transactions: SportsbookBetTransaction[];
};
