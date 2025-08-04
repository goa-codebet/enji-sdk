"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { createEnjiStore, EnjiStore } from "../stores/enjiStore";
import { EnjiClient, Http } from "../../shared";

export type EnjiStoreApi = ReturnType<typeof createEnjiStore>;

export const EnjiStoreContext = createContext<EnjiStoreApi | undefined>(
  undefined
);

export interface EnjiStoreProviderProps {
  children: ReactNode;
  host: string;
}

export const EnjiStoreProvider = ({
  children,
  host,
}: EnjiStoreProviderProps) => {
  const storeRef = useRef<EnjiStoreApi | null>(null);

  if (storeRef.current === null) {
    const enjiClient = new EnjiClient(new Http(host));
    storeRef.current = createEnjiStore({ api: enjiClient });
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <EnjiStoreContext.Provider value={storeRef.current}>
      {children}
    </EnjiStoreContext.Provider>
  );
};

export const useEnjiStore = <T,>(selector: (store: EnjiStore) => T): T => {
  const enjiStoreContext = useContext(EnjiStoreContext);

  if (!enjiStoreContext) {
    throw new Error(`useEnjiStore must be used within EnjiStoreProvider`);
  }

  return useStore(enjiStoreContext, selector);
};
