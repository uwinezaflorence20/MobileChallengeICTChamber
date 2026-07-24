import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'dog-breeds:favorites';

interface FavoritesContextValue {
  favoriteIds: number[];
  isFavorite: (breedId: number) => boolean;
  toggleFavorite: (breedId: number) => void;
  loaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setFavoriteIds(JSON.parse(raw));
      })
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds)).catch(() => {});
    }
  }, [favoriteIds, loaded]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      loaded,
      isFavorite: (breedId: number) => favoriteIds.includes(breedId),
      toggleFavorite: (breedId: number) =>
        setFavoriteIds((prev) =>
          prev.includes(breedId) ? prev.filter((id) => id !== breedId) : [...prev, breedId]
        ),
    }),
    [favoriteIds, loaded]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
