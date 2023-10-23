import { create } from "zustand";

interface ContactModalState {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  talent: { name: string; email: string };
  setTalent: (talent: { name: string; email: string }) => void;
}

export const useContactModalStore = create<ContactModalState>()((set) => ({
  isOpen: false,
  setOpen: (value: boolean) => set(() => ({isOpen: value})),
  talent: { email: "", name: "" },
  setTalent: (talent) => set(() => ({ talent })),
}));
