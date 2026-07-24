import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BreedCard } from '../../src/components/BreedCard';
import { EmptyView, LoadingView } from '../../src/components/StateViews';
import { useBreeds } from '../../src/context/BreedsContext';
import { useFavorites } from '../../src/context/FavoritesContext';
import { useTheme } from '../../src/theme/useTheme';

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { breeds, loading } = useBreeds();
  const { favoriteIds, isFavorite, toggleFavorite, loaded } = useFavorites();

  const favoriteBreeds = useMemo(
    () => breeds.filter((b) => favoriteIds.includes(b.id)),
    [breeds, favoriteIds]
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Favorites</Text>
        <Text style={[styles.subtitle, { color: theme.subtext }]}>
          {favoriteBreeds.length
            ? `${favoriteBreeds.length} breed${favoriteBreeds.length === 1 ? '' : 's'} saved`
            : 'Breeds you love, all in one place'}
        </Text>
      </View>

      {loading || !loaded ? (
        <LoadingView />
      ) : favoriteBreeds.length === 0 ? (
        <EmptyView message="Tap the ♡ on any breed to save it here." />
      ) : (
        <FlatList
          data={favoriteBreeds}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <BreedCard
              breed={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
              onPress={() => router.push(`/breed/${item.id}`)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
});
