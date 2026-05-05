export type NextFetchOptions = {
  revalidate?: number | false;
};

export type EnjiRequestConfig = Omit<RequestInit, "body" | "method"> & {
  next?: NextFetchOptions;
};

export type HttpOptions = {
  getClientIp?: () => Promise<string | null | undefined>;
};
