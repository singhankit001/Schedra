import { create } from "zustand";

interface UIState {
  /** Whether the mobile/collapsed sidebar drawer is open. Not yet consumed
   * by any component — this is foundational state for the responsive
   * sidebar behavior described in visual-spec/responsive.md, wired up once
   * the real sidebar navigation is built. */
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
