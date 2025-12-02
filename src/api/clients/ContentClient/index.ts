import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import { Jurisdiction } from "@/api/types";
import {
  ContentDocumentModel,
  ContentDocumentState,
  ContentDocumentType,
} from "./types";

export class ContentClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get the bootstrap
   *
   * Requires client IP
   */
  async getBootstrap(country?: string, config?: EnjiRequestConfig) {
    return this.http.get<unknown>(
      "/content/bootstrap",
      country ? { country } : null,
      null,
      config
    );
  }

  /**
   * Get content documents by type and language (language not mandatory)
   *
   * State = Preview will include highest matching version of preview and published
   *
   * State = Published will only include highest matching version of published.
   */
  async getDocument(
    params: {
      type?: ContentDocumentType;
      jurisdiction?: Jurisdiction;
      language?: string;
      state?: ContentDocumentState;
    },
    config?: EnjiRequestConfig
  ) {
    return this.http.get<ContentDocumentModel>(
      "/content/GetDocument",
      params,
      null,
      config
    );
  }
}
