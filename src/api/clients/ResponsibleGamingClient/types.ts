import { Product } from "@/api/types";

export type PgsiScoreVersion = "Full" | "Short" | "SpainLimit";

export type SessionInfo = {
  TimeUntilRealityCheck: number;
  SessionLength: number;
  SessionLenght: number;
  CurrentUnixStarted: number;
  LastUnixStarted: number;
  LastUnixEnded: number;
  LastLoginIp?: string;
  LastLoginDevice?: string;
  LastWager: number;
  LastWon: number;
};

export type ProductWagerWin = {
  Product?: Product;
  Wager: number;
  Win: number;
};

export type RealityCheckData = {
  WagerWins?: ProductWagerWin[];
};

export type PlayerBlockStatus = "Active" | "Inactive" | "CoolDown";

export type ProductBlock = {
  Id: number;
  Product: Product;
  Status: PlayerBlockStatus;
  Expires: string;
};

export type PanicChoice = "Open" | "Pause" | "None";

export type PanicParams = {
  PanicChoice: PanicChoice;
};

export type AddPsgiScoreParams = {
  Score: number;
  Version: PgsiScoreVersion;
};
