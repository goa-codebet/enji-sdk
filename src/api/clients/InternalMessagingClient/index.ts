import { Http } from "@/api/Http";
import { BaseClient } from "../BaseClient";
import { InternalMessage, InternalMessageStatus } from "./types";

export class InternalMessagingClient extends BaseClient {
  constructor(http: Http, sessionId: string | null = null) {
    super(http, sessionId);
  }

  /**
   * Get all messages available for the player
   *
   * Requires session
   */
  async getAll(): Promise<InternalMessage[]> {
    return this.http.get<InternalMessage[]>(
      "/internalmessages",
      null,
      this.sessionId
    );
  }

  /**
   * Get all messages available with the status for the player
   *
   * Requires session
   */
  async getByStatus(status: InternalMessageStatus): Promise<InternalMessage[]> {
    return this.http.get<InternalMessage[]>(
      "/internalmessages/with-status",
      { status },
      this.sessionId
    );
  }

  /**
   * Get the contents of a specific message
   *
   * The message will be marked as read
   *
   * Requires session
   */
  async getById(messageId: number): Promise<InternalMessage> {
    return this.http.get<InternalMessage>(
      "/internalmessages/with-status",
      { messageId },
      this.sessionId
    );
  }

  /**
   * Mark a message as notified or read by the player
   *
   * Requires session
   */
  async markMessage(
    MessageId: number,
    Status: InternalMessageStatus
  ): Promise<void> {
    return this.http.post<void>(
      "/internalmessages/mark",
      { MessageId, Status },
      this.sessionId
    );
  }
}
