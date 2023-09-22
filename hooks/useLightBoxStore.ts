import { create } from "zustand";

interface LightBoxState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  media: string;
  setMedia: (media: string) => void;
}

export const useLightBoxStore = create<LightBoxState>()((set) => ({
  isOpen: false,
  media: "",
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
  setMedia: (media) => set(() => ({ media })),
}));
