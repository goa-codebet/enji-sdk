import { Currency, Jurisdiction, Platform } from "@/api/types";

export type IframeSetup = {
  AllowedParentIFrameBaseUrl: string;
  OverrideIFrameBaseUrlWith?: string;
  ParentSportsbookUrl?: string;
};

export type CreateBetssonContextParams = {
  Language?: string;
  Currency?: Currency;
  Jurisdiction: Jurisdiction;
  UserAgent?: string;
  CounteryCode?: string;
  Platform?: Platform;
  IframeSetup: IframeSetup;
  DeepLinking?: boolean;
};

export type ContextManagementResponseCode =
  | "Success"
  | "PartialSuccess"
  | "ValidationFailed"
  | "MalformedRequest"
  | "InvalidCustomer"
  | "InvalidUserContext"
  | "UserContextExpired"
  | "FailedCustomerMapping"
  | "InvalidSegmentId"
  | "InvalidLanguageCode"
  | "InvalidJurisdiction"
  | "InvalidCurrencyCode"
  | "InvalidCustomerCurrencyCode"
  | "InvalidCustomerAccountStatus"
  | "InvalidProductBehaviourAttribute"
  | "UnknownBrand"
  | "TechnicalError"
  | "CommunicationFailure";

export type IFrameHelper = {
  AbsoluteUri?: string;
  BaseUri?: string;
  Path?: string;
  Query?: string;
  Fragments?: string;
  NeutralPath?: string;
  GlobalId?: string;
  Properties?: Record<string, string>;
  TranslatedPaths?: Record<string, string>;
  Labels?: Record<string, string>;
};

export type CustomerContext = {
  StaticContextId?: string;
  UserContextId?: string;
};

export type CreateBetssonContextResponse = {
  CorrelationId?: string;
  ResponseNotes?: string[];
  DateTimeStamp: string;
  ResponseCode: ContextManagementResponseCode;
  IFrameHelper: IFrameHelper;
  CustomerContext: CustomerContext;
  ContentPages?: Record<string, string>;
};
