import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { JWTMetadata } from './Cimplico_Marketplace_Typescript_Definitions';

type currentFirm = {
  name: string;
  id: string;
};

type State = {
  jwt: null | JWTMetadata;
  currentFirm: null | currentFirm;
};

type Actions = {
  setToken: (token: JWTMetadata) => void;
  setFirm: (firm: currentFirm) => void;
  reset: () => void;
};

const initialState: State = {
  jwt: null,
  currentFirm: null,
};

const useAppStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setToken: (token: JWTMetadata) => {
          set({ jwt: token });
        },
        setFirm: (firm: currentFirm) => {
          set({ currentFirm: firm });
        },
        reset: () => {
          set(initialState);
        },
      }),
      {
        name: 'app-storage',
      }
    )
  )
);

export default useAppStore;
