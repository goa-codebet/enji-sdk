export type NextFetchOptions = {
  revalidate?: number | false;
};

export type EnjiRequestConfig = Omit<RequestInit, "body" | "method"> & {
  next?: NextFetchOptions;
};
