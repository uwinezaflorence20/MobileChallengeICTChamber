import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchBreeds } from '../api/dogApi';
import type { Breed } from '../types';

interface BreedsContextValue {
  breeds: Breed[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getBreed: (id: number) => Breed | undefined;
}

const BreedsContext = createContext<BreedsContextValue | undefined>(undefined);

export function BreedsProvider({ children }: { children: React.ReactNode }) {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchBreeds();
      data.sort((a, b) => a.name.localeCompare(b.name));
      setBreeds(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load breeds');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(async () => {
    setLoading(true);
    await load();
  }, [load]);

  const getBreed = useCallback((id: number) => breeds.find((b) => b.id === id), [breeds]);

  const value = useMemo<BreedsContextValue>(
    () => ({ breeds, loading, error, refresh, getBreed }),
    [breeds, loading, error, refresh, getBreed]
  );

  return <BreedsContext.Provider value={value}>{children}</BreedsContext.Provider>;
}

export function useBreeds(): BreedsContextValue {
  const ctx = useContext(BreedsContext);
  if (!ctx) throw new Error('useBreeds must be used within a BreedsProvider');
  return ctx;
}
