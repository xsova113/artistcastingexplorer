import { create } from "zustand";

interface SignInAlertState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSignInAlertStore = create<SignInAlertState>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSignInAlertStore;
