import { create } from "zustand";

interface ReviewStore {
  isOpen: boolean;
  talentIds: string[];
  type: "approve" | "reject" | "";
  onOpen: (
    talentId: { talentIds: string[] },
    value?: "approve" | "reject",
  ) => void;
  onClose: () => void;
}

export const useReviewStore = create<ReviewStore>()((set) => ({
  isOpen: false,
  type: "",
  talentIds: [],
  onOpen: (talentIds, value) =>
    set(() => ({
      isOpen: true,
      type: value,
      talentIds: [...talentIds.talentIds],
    })),
  onClose: () => set(() => ({ isOpen: false })),
}));
