import { Jurisdiction } from "@/api/types";

export type ContentDocumentType =
  | "TermsAndConditions"
  | "PrivacyPolicy"
  | "CookiePolicy"
  | "PGSI";

export type ContentDocumentState = "Preview" | "Published";

export type ContentDocumentModel = {
  Version?: string;
  Content?: string;
  Language?: string;
  State: ContentDocumentState;
  Jurisdiction: Jurisdiction;
};
