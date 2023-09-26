import { create } from "zustand";

interface SortStore {
  orderBy: "recently_updated" | "name-a" | "name-z";
  setOrderBy: (value: "recently_updated" | "name-a" | "name-z") => void;
}

export const useSortStore = create<SortStore>()((set) => ({
  orderBy: "recently_updated",
  setOrderBy: (orderBy) => set(() => ({ orderBy })),
}));
