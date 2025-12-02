import { Http } from "@/api/Http";
import type { EnjiRequestConfig } from "@/api/Http/types";
import { BaseClient } from "../BaseClient";
import { InternalMessage, InternalMessageStatus } from "./types";

export class InternalMessagingClient extends BaseClient {
  constructor(http: Http) {
    super(http);
  }

  /**
   * Get all messages available for the player
   *
   * Requires session
   */
  async getAll(sessionId: string, config?: EnjiRequestConfig) {
    return this.http.get<InternalMessage[]>(
      "/internalmessages",
      null,
      sessionId,
      config
    );
  }

  /**
   * Get all messages available with the status for the player
   *
   * Requires session
   */
  async getByStatus(
    sessionId: string,
    status: InternalMessageStatus,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<InternalMessage[]>(
      "/internalmessages/with-status",
      { status },
      sessionId,
      config
    );
  }

  /**
   * Get the contents of a specific message
   *
   * The message will be marked as read
   *
   * Requires session
   */
  async getById(
    sessionId: string,
    messageId: number,
    config?: EnjiRequestConfig
  ) {
    return this.http.get<InternalMessage>(
      "/internalmessages/with-status",
      { messageId },
      sessionId,
      config
    );
  }

  /**
   * Mark a message as notified or read by the player
   *
   * Requires session
   */
  async markMessage(
    sessionId: string,
    params: {
      MessageId: number;
      Status: InternalMessageStatus;
    },
    config?: EnjiRequestConfig
  ) {
    return this.http.post("/internalmessages/mark", params, sessionId, config);
  }
}
