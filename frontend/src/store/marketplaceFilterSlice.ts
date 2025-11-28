import { StateCreator } from 'zustand';

// TODO: Replace the current approach with server side filtering
interface State {
  searchTerm: string;
  entityType: string[];
  contentType: string[];
  workpaperType: string[];
  page: number;
  pageSize: number;
}

interface Actions {
  setSearchTerm: (term: string) => void;
  setEntityType: (type: string) => void;
  setContentType: (type: string) => void;
  setWorkpaperType: (type: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export type MarketplaceFilterSlice = State & Actions;

const initialMarketplaceFilterState: State = {
  searchTerm: '',
  entityType: [],
  contentType: [],
  workpaperType: [],
  page: 1,
  pageSize: 10,
};

export const createMarketplaceFilterSlice: StateCreator<
  MarketplaceFilterSlice,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  MarketplaceFilterSlice
> = (set) => ({
  ...initialMarketplaceFilterState,

  setSearchTerm: (term) => set({ searchTerm: term }),

  setEntityType: (type) => {
    set((state) => ({
      entityType: state.entityType.includes(type)
        ? state.entityType.filter((t) => t !== type)
        : [...state.entityType, type],
    }));
  },

  setContentType: (type) => {
    set((state) => ({
      contentType: state.contentType.includes(type)
        ? state.contentType.filter((t) => t !== type)
        : [...state.contentType, type],
    }));
  },

  setWorkpaperType: (type) => {
    set((state) => ({
      workpaperType: state.workpaperType.includes(type)
        ? state.workpaperType.filter((t) => t !== type)
        : [...state.workpaperType, type],
    }));
  },

  setPage: (page) => set({ page }),

  resetFilters: () => set(initialMarketplaceFilterState),
});
