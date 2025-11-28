import { StateCreator } from 'zustand';

import {
  JWTMetadata,
  Firm,
} from '@/types/Cimplico_Marketplace_Typescript_Definitions';

interface State {
  jwt: null | JWTMetadata;
  currentFirm: null | Firm;
}

interface Actions {
  setToken: (token: JWTMetadata) => void;
  setFirm: (firm: Firm) => void;
  resetAuth: () => void;
}

//initially none because no user is not logged in and no firm is selected
const initialAuthState: State = {
  jwt: null,
  currentFirm: null,
};

export type AuthSlice = State & Actions;

export const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  AuthSlice
> = (set) => ({
  ...initialAuthState,
  setToken: (token) => set({ jwt: token }),
  setFirm: (firm) => set({ currentFirm: firm }),
  resetAuth: () => set(initialAuthState),
});
