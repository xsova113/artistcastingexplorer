import { create } from "zustand";

interface ReviewStore {
  isOpen: boolean;
  talentId: string;
  type: "approve" | "reject" | "";
  onOpen: (
    talentId: { talentId: string },
    value?: "approve" | "reject",
  ) => void;
  onClose: () => void;
}

export const useReviewStore = create<ReviewStore>()((set) => ({
  isOpen: false,
  type: "",
  talentId: "",
  onOpen: (talentId, value) =>
    set(() => ({ isOpen: true, type: value, talentId: talentId.talentId })),
  onClose: () => set(() => ({ isOpen: false })),
}));
