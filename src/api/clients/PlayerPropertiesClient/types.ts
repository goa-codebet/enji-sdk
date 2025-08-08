export type PlayerPropertyType =
  | "Text"
  | "Number"
  | "DateTime"
  | "Date"
  | "Time"
  | "OddsFormat";

export type PlayerProperty = {
  PlayerId: number;
  Name?: string;
  Type?: PlayerPropertyType;
  value?: string;
};

export type PlayerPropertyData = {
  Name: string;
  Type: PlayerPropertyType;
  Value: string;
};

export type SetPlayerPropertiesParams = {
  Properties: PlayerPropertyData[];
};
