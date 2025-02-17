"use client"
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, TailwindColor } from './TypesStoreMarqueBlanche';

interface ThemeStore {
  theme: Theme;
  setTextColor: (color: TailwindColor) => void;
  setContainerColor: (color: TailwindColor) => void;
  resetTheme: () => void;
}

const defaultTheme: Theme = {
  textColor: 'text-gray-900',
  containerColor: 'bg-white',
};

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      setTextColor: (color) => 
        set((state) => ({
          theme: { ...state.theme, textColor: color }
        })),
      setContainerColor: (color) => 
        set((state) => ({
          theme: { ...state.theme, containerColor: color }
        })),
      resetTheme: () => set({ theme: defaultTheme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;