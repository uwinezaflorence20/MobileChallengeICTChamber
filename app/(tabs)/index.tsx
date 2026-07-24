import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BreedCard } from '../../src/components/BreedCard';
import { SearchBar } from '../../src/components/SearchBar';
import { EmptyView, ErrorView, LoadingView } from '../../src/components/StateViews';
import { useBreeds } from '../../src/context/BreedsContext';
import { useFavorites } from '../../src/context/FavoritesContext';
import { useTheme } from '../../src/theme/useTheme';

export default function BreedsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { breeds, loading, error, refresh } = useBreeds();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return breeds;
    return breeds.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.breed_group?.toLowerCase().includes(q) ||
        b.temperament?.toLowerCase().includes(q)
    );
  }, [breeds, query]);

  const handleSurpriseMe = () => {
    if (breeds.length === 0) return;
    const random = breeds[Math.floor(Math.random() * breeds.length)];
    router.push(`/breed/${random.id}`);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Dog Breeds</Text>
          <Text style={[styles.subtitle, { color: theme.subtext }]}>
            {breeds.length ? `${breeds.length} breeds to explore` : 'Explore & discover'}
          </Text>
        </View>
        <Pressable
          onPress={handleSurpriseMe}
          style={[styles.surpriseButton, { backgroundColor: theme.primarySoft }]}
        >
          <Text style={styles.surpriseEmoji}>🎲</Text>
        </Pressable>
      </View>

      <SearchBar value={query} onChangeText={setQuery} />

      {loading && breeds.length === 0 ? (
        <LoadingView />
      ) : error && breeds.length === 0 ? (
        <ErrorView message={error} onRetry={refresh} />
      ) : filtered.length === 0 ? (
        <EmptyView message="No breeds match your search." />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={styles.list}
          refreshing={loading}
          onRefresh={refresh}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  surpriseButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surpriseEmoji: {
    fontSize: 20,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
});
