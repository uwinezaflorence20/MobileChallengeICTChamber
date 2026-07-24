import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchBreedImages } from '../../src/api/dogApi';
import { Chip } from '../../src/components/Chip';
import { HeartButton } from '../../src/components/HeartButton';
import { ImageCarousel } from '../../src/components/ImageCarousel';
import { EmptyView, LoadingView } from '../../src/components/StateViews';
import { StatBox } from '../../src/components/StatBox';
import { useBreeds } from '../../src/context/BreedsContext';
import { useFavorites } from '../../src/context/FavoritesContext';
import { useTheme } from '../../src/theme/useTheme';
import type { DogImage } from '../../src/types';

export default function BreedDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const breedId = Number(id);
  const { theme } = useTheme();
  const { getBreed } = useBreeds();
  const { isFavorite, toggleFavorite } = useFavorites();

  const breed = getBreed(breedId);
  const [images, setImages] = useState<DogImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoadingImages(true);
    fetchBreedImages(breedId)
      .then((data) => {
        if (!cancelled) setImages(data);
      })
      .catch(() => {
        if (!cancelled) setImages([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingImages(false);
      });
    return () => {
      cancelled = true;
    };
  }, [breedId]);

  if (!breed) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <EmptyView message="Breed not found." />
      </View>
    );
  }

  const temperaments = breed.temperament?.split(',').map((t) => t.trim()).filter(Boolean) ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Stack.Screen options={{ title: '' }} />
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        {loadingImages && images.length === 0 ? (
          <View style={styles.carouselLoading}>
            <LoadingView label="Fetching photos…" />
          </View>
        ) : (
          <ImageCarousel images={images.length ? images : breed.image ? [breed.image] : []} />
        )}

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={[styles.name, { color: theme.text }]}>{breed.name}</Text>
            <HeartButton
              active={isFavorite(breed.id)}
              onPress={() => toggleFavorite(breed.id)}
              overlay={false}
              size={24}
            />
          </View>

          {breed.origin ? (
            <Text style={[styles.origin, { color: theme.subtext }]}>📍 {breed.origin}</Text>
          ) : null}

          <View style={styles.statsRow}>
            <StatBox label="Life span" value={breed.life_span ?? '—'} />
            <StatBox label="Weight" value={breed.weight?.metric ? `${breed.weight.metric} kg` : '—'} />
            <StatBox label="Height" value={breed.height?.metric ? `${breed.height.metric} cm` : '—'} />
          </View>

          {breed.breed_group ? (
            <>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Breed group</Text>
              <Text style={[styles.bodyText, { color: theme.subtext }]}>{breed.breed_group}</Text>
            </>
          ) : null}

          {breed.bred_for ? (
            <>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Bred for</Text>
              <Text style={[styles.bodyText, { color: theme.subtext }]}>{breed.bred_for}</Text>
            </>
          ) : null}

          {temperaments.length > 0 ? (
            <>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Temperament</Text>
              <View style={styles.chipsRow}>
                {temperaments.map((t) => (
                  <Chip key={t} label={t} />
                ))}
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  carouselLoading: {
    height: 320,
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    flexShrink: 1,
  },
  origin: {
    fontSize: 14,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: -4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 22,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
});
