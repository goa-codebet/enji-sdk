export class EnjiError extends Error {
  Code: string;
  Details?: Record<string, string>;

  constructor({
    Code,
    Message,
    Details,
  }: {
    Code: string;
    Message: string;
    Details?: Record<string, string>;
  }) {
    super(Message);
    this.Code = Code;
    this.Details = Details;
    this.name = "EnjiError";
  }
}
