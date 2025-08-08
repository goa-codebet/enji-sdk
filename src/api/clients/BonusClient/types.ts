import { Currency, Product } from "@/api/types";
import { GameProvider } from "../CasinoClient/types";

export type OfferType =
  | "Deposit"
  | "Registration"
  | "Login"
  | "PromotionCode"
  | "Activation"
  | "EmailActivation"
  | "SmsActivation"
  | "Manual"
  | "ResetPassword"
  | "ManualBatchPayout"
  | "CashBack"
  | "FreeBetOnEvents"
  | "CasinoTournament"
  | "CompetitionLabs"
  | "Maxcreate"
  | "Gamanza"
  | "IBEX"
  | "ISoftBet"
  | "PragmaticPlay"
  | "EvolutionGaming";

export type MaxDepositType = "LessThan" | "LessThanOrEqual";

export type MinDepositType = "MoreThan" | "MoreThanOrEqual";

export type RewardType = "FixedSum" | "MatchedDeposit" | "Freespin" | "FreeBet";

export type WageringType =
  | "None"
  | "PaidBonusAmountXFactor"
  | "PaidBonusAmountPlusDepositAmountXFactor"
  | "FixedAmount"
  | "NumberOfBetsXBetAmount";

export type CurrencyAmount = {
  Currency?: Currency;
  FixedAmount?: number;
  ForfeitedValue?: number;
  MatchedDepositCapAmount?: number;
  MaxDepositAmount?: number;
  MinDepositAmount?: number;
};

export type Reward = {
  Amount: number;
  CurrencyAmounts: CurrencyAmount[];
  Games: number[];
  MaxDepositType: MaxDepositType;
  MinDepositType: MinDepositType;
  Product: Product;
  RewardType?: RewardType;
  ValidDays: number;
  ValidDaysFreespins?: number;
  WageringFactor: number;
  WageringType: WageringType;
};

export type RewardGroup = {
  Name?: string;
  PromoCode?: string;
  Rewards: Reward[];
};

export type BonusOffer = {
  Id: number;
  Identifier?: string;
  priority: number;
  ValidDateStart: string;
  ValidDateEnd: string;
  IsOptInRequired: boolean;
  MaxPerPlayerClaimCount: number;
  MaxPerPlayerClaimCountOn: "Day" | "Week" | "Month";
  PlayerClaimCount: number;
  RewardGroups?: RewardGroup[];
  HasPlyerOptedIn: boolean;
  Name?: string;
};

export type WithdrawPolicy = "DenyWithdraw" | "CancelMonetary" | "None";

export type GameProps = {
  Id: number;
  Name?: string;
};

export type BonusInstance = {
  Id: number;
  Identifier?: string;
  Name?: string;
  Description?: string;
  Amount: number;
  Currency?: Currency;
  State?: string;
  Created: string;
  Activates?: string;
  Initiated?: string;
  Ended?: string;
  Expires: string;
  WageringRequirment?: number;
  WageringRequirmentRemaining?: number;
  PreWageringRequirment?: number;
  PreWageringRequirmentRemaining?: number;
  AmountRemaining?: number;
  Type?: string;
  AmoutWon: number;
  Product?: Product;
  WithdrawPolicy?: WithdrawPolicy;
  GameProps?: GameProps[];
  GameProvider: GameProvider;
};

export type PendingBonusReward = {
  Amount: number;
  Currency?: Currency;
  Type?: string;
  WageringRequirment?: number;
  WageringFactor: number;
  WageringType?: string;
  Games?: number[];
  Product?: Product;
};

export type PendingBonus = {
  Id: number;
  Name?: string;
  Description?: string;
  Created: string;
  Expires: string;
  Rewards?: PendingBonusReward[];
};
