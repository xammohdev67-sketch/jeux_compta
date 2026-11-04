import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GameState {
  lives: number;
  maxLives: number;
  xp: number;
  streak: number;
  currentLevel: number;
  hasHydrated: boolean;
  decreaseLives: () => void;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  restoreLives: () => void;
  setHasHydrated: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      lives: 5,
      maxLives: 5,
      xp: 0,
      streak: 0,
      currentLevel: 1,
      hasHydrated: false,

      decreaseLives: () =>
        set((state) => ({
          lives: Math.max(0, state.lives - 1),
        })),

      addXP: (amount) =>
        set((state) => {
          if (!Number.isFinite(amount) || amount <= 0) {
            return state;
          }

          const xp = state.xp + amount;

          return {
            xp,
            currentLevel: Math.floor(xp / 250) + 1,
          };
        }),

      incrementStreak: () =>
        set((state) => ({
          streak: state.streak + 1,
        })),

      resetStreak: () =>
        set(() => ({
          streak: 0,
        })),

      restoreLives: () =>
        set((state) => ({
          lives: state.maxLives,
        })),

      setHasHydrated: () =>
        set(() => ({
          hasHydrated: true,
        })),
    }),
    {
      name: 'compta-quest-progress',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ currentLevel, lives, streak, xp }) => ({
        currentLevel,
        lives,
        streak,
        xp,
      }),
      version: 1,
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Impossible de restaurer la progression locale.', error);
        }

        state?.setHasHydrated();
      },
    },
  ),
);
