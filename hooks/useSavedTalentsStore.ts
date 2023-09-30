import { create } from "zustand";

interface SavedTalentsStore {
  selectedTalentIds: string[];
  setSelectedTalentIds: (value: string[]) => void;
}

export const useSavedTalentsStore = create<SavedTalentsStore>()((set) => ({
  selectedTalentIds: [],
  setSelectedTalentIds: (ids) => set(() => ({ selectedTalentIds: ids })),
}));
