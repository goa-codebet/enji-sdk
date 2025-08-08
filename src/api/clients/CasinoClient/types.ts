export type Platform = "Desktop" | "Mobile" | "Mini" | "Micro";

export type Table = {
  TableId: number;
  ExternalTableId?: string;
  Name?: string;
};

export type GameProvider =
  | "Quickfire"
  | "WebPrefer"
  | "NetEnt"
  | "Relax"
  | "Endorphina"
  | "EvolutionGaming"
  | "ISoftBet"
  | "GamingGenius"
  | "NYX"
  | "Cubeia"
  | "Yggdrasil"
  | "Lottoland"
  | "AuthenticGaming"
  | "Ganapati"
  | "RedTigerGaming"
  | "PragmaticPlay"
  | "QuickSpin"
  | "PushGaming"
  | "NoLimitCity"
  | "PlayNGO"
  | "ThrillTech";

export type CasinoGame = {
  Id: number;
  Name?: string;
  Category?: string;
  Provider?: GameProvider;
  SubProvider?: string;
  ExternalId?: string;
  Attributes?: string[];
  Filters?: string[];
  JackpotIds?: number[];
  FavoriteCount?: number;
  Platform: Platform;
  AdditionalPlatforms?: Platform[];
  Rtp: number;
  JackpotPercentageCont: number;
  Tables?: Table[];
  LinkedGames?: string[];
};

export type CasinoGameInfo = {
  StaticContentServerInfo?: Record<string, string>;
  GameInfo?: Record<string, string>;
};
