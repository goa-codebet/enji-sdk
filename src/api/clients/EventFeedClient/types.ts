import { Currency } from "@/api/types";

export type Jackpot = {
  Id: number;
  Name?: string;
  GameIds?: number[];
  Amount: number;
  Currency: Currency;
  Provider: string;
};

export type LinkedSkinGame = {
  GameId: number;
  GameName?: string;
};

export type SkinGame = {
  GameId: number;
  GameName?: string;
  LinkedGames: LinkedSkinGame[];
};
