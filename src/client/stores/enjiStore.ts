// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";
import { EnjiClient } from "../../shared";

export type EnjiState = {
  api: EnjiClient;
};

// export type EnjiActions = {
//     refreshWallet: (cb?: (wallet: any) => void) => void;
//     setSessionId: (sessionId:string) => void;
//     toggleFavoriteGame: (gameId: number, tableId?: number) => void;
//     setLastPlayedGame: (gameId: number, backendTableId: number) => void;
// }

export type EnjiStore = EnjiState;

export const createEnjiStore = (initState: EnjiState) => {
  return createStore<EnjiStore>()((set) => ({
    ...initState,
  }));
};
