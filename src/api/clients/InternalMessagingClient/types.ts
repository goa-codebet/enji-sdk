export type InternalMessageStatus = "Unpushed" | "Notified" | "Read";

export type InternalMessage = {
  Id: number;
  Content?: string;
  Title?: string;
  Status: InternalMessageStatus;
  StartDate: string;
  EndDate: string;
  Attributes?: Record<string, string>;
};
