export type KycDocumentType =
  | "ID"
  | "ProofOfAddress"
  | "CreditCard"
  | "BankStatement"
  | "EWallet"
  | "SourceOfWealth"
  | "Other";

export type KycDocument = {
  Type: KycDocumentType;
  Image: string;
};

export type KycReport = {
  Type?: string;
  TypeCode: number;
  Status?: string;
  StatusCode: number;
  Reason?: string;
  ReasonCode: number;
  Reasons?: string[];
  Added: string;
};

export type SourceOfWealthType = "ExpectedAnnualActivity";

export type AddSourceOfWealthFormParams =
  | {
      Type: SourceOfWealthType;
      IncomeFromValue: number;
      IncomeToValue: number;
    }
  | {
      Type?: never;
      Source: string;
      IncomeFromValue: number;
      IncomeToValue: number;
      Industry: string;
      Occupation: string;
      Nationality: string;
      CountryOfBirthCode: string;
    };
