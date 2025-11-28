import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './authSlice';
import {
  MarketplaceFilterSlice,
  createMarketplaceFilterSlice,
} from './marketplaceFilterSlice';
import { devtools, persist } from 'zustand/middleware';

export type StoreType = AuthSlice &
  MarketplaceFilterSlice & {
    hydrated: boolean;
    setHydrated: (val: boolean) => void;
  };

const useAppStore = create<StoreType>()(
  devtools(
    persist<StoreType>( //the persists middleware allows the store to be saved in local storage
      (...a) => ({
        ...createMarketplaceFilterSlice(...a),
        ...createAuthSlice(...a),
        hydrated: false,
        setHydrated: (val: boolean) =>
          a[0]((state) => ({ ...state, hydrated: val })),
      }),
      {
        name: 'app-storage',
        onRehydrateStorage: () => (state) => {
          //called when the store is rehydrated from local storage, for example when the page is refreshed
          if (state) {
            state.setHydrated(true);
          }
        },
      }
    )
  )
);

export default useAppStore;
