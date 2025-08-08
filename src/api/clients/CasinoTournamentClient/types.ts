import { Currency } from "@/api/types";

// Tournament Types
export type TournamentInfo = {
  Id: number;
  Identifier?: string;
  Name?: string;
  Description?: string;
  Start: string;
  End: string;
  Game?: TournamentGame;
};

export type TournamentGame = {
  Id: number;
  Name?: string;
  Tables?: TournamentGameTable[];
};

export type TournamentGameTable = {
  TableId?: string;
  Name?: string;
};

export type CurrencySetting = {
  Currency?: Currency;
  MinBetPerRound: number;
};

export type TournamentPlayer = {
  Id: number;
  Login?: string;
  Nickname?: string;
  FirstName?: string;
  LastName?: string;
  Country?: string;
  Currency?: Currency;
  Position: number;
  Points: number;
  RealMoneyWagered: number;
  RealMoneyWon: number;
  BonusMoneyWagered: number;
  BonusMoneyWon: number;
  RoundsPlayed: number;
  MayParticipate: boolean;
  Joined: string;
};

export type TournamentPrize = {
  PositionFrom: number;
  PositionTo: number;
  Type?: string;
  FreespinsAmount?: number;
  CurrencySettings?: CurrencySetting[];
};

export type TournamentLeaderboard = {
  Id: number;
  Identifier?: string;
  Name?: string;
  Description?: string;
  Type?: string;
  StartDate: string;
  EndDate: string;
  IsEnabled: boolean;
  MinRounds: number;
  ConsecutiveRounds?: number;
  IsOptIn: boolean;
  CurrencySettings?: CurrencySetting[];
  PlayerCount: number;
  Players: TournamentPlayer[];
  Prizes: TournamentPrize[];
  Games?: TournamentGame[];
};
