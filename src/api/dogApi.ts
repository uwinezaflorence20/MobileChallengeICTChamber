import type { Breed, DogImage } from '../types';

const BASE_URL = 'https://api.thedogapi.com/v1';
const API_KEY = process.env.EXPO_PUBLIC_DOG_API_KEY ?? '';

class DogApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'DogApiError';
  }
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: API_KEY ? { 'x-api-key': API_KEY } : undefined,
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new DogApiError(
        'Missing or invalid Dog API key. Add EXPO_PUBLIC_DOG_API_KEY to your .env file.',
        res.status
      );
    }
    throw new DogApiError(`Dog API request failed (${res.status})`, res.status);
  }

  return res.json() as Promise<T>;
}

export async function fetchBreeds(): Promise<Breed[]> {
  return request<Breed[]>('/breeds');
}

export async function fetchBreedImages(breedId: number, limit = 12): Promise<DogImage[]> {
  return request<DogImage[]>(
    `/images/search?breed_ids=${breedId}&limit=${limit}&size=med&order=RANDOM`
  );
}

export async function fetchRandomImage(breedId?: number): Promise<DogImage | null> {
  const query = breedId ? `?breed_ids=${breedId}&limit=1` : '?limit=1';
  const images = await request<DogImage[]>(`/images/search${query}`);
  return images[0] ?? null;
}

export { DogApiError };
