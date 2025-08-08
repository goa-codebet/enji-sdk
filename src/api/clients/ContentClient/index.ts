import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { Jurisdiction } from "@/api/types";
import {
  ContentDocumentModel,
  ContentDocumentState,
  ContentDocumentType,
} from "./types";

export class ContentClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Get the bootstrap
   *
   * Requires client IP
   */
  async getBootstrap(country?: string) {
    return this.http.get<unknown>(
      "/content/bootstrap",
      country ? { country } : null
    );
  }

  /**
   * Get content documents by type and language (language not mandatory)
   *
   * State = Preview will include highest matching version of preview and published
   *
   * State = Published will only include highest matching version of published.
   */
  async getDocument(params: {
    type?: ContentDocumentType;
    jurisdiction?: Jurisdiction;
    language?: string;
    state?: ContentDocumentState;
  }) {
    return this.http.get<ContentDocumentModel>("/content/GetDocument", params);
  }
}
