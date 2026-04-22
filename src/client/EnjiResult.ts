import type { EnjiError } from "./EnjiError";

export type EnjiResult<T> =
  | { data: T; error: null }
  | { data: null; error: EnjiError };
