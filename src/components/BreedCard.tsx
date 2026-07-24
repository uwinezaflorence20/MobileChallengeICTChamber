import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/useTheme';
import type { Breed } from '../types';
import { HeartButton } from './HeartButton';

interface Props {
  breed: Breed;
  onPress: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function BreedCard({ breed, onPress, isFavorite, onToggleFavorite }: Props) {
  const { theme } = useTheme();
  const imageUrl = breed.image?.url;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border, opacity: pressed ? 0.9 : 1 },
      ]}
    >
      <View style={styles.imageWrap}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={[styles.image, styles.placeholder, { backgroundColor: theme.chip }]} />
        )}
        <View style={styles.heartWrap}>
          <HeartButton active={isFavorite} onPress={onToggleFavorite} size={18} />
        </View>
      </View>
      <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
        {breed.name}
      </Text>
      {breed.breed_group ? (
        <Text style={[styles.group, { color: theme.subtext }]} numberOfLines={1}>
          {breed.breed_group}
        </Text>
      ) : (
        <Text style={[styles.group, { color: theme.subtext }]} numberOfLines={1}>
          {breed.temperament?.split(',')[0] ?? ' '}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    padding: 8,
    margin: 6,
  },
  imageWrap: {
    borderRadius: 14,
    overflow: 'hidden',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartWrap: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  name: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '700',
  },
  group: {
    fontSize: 12,
    marginTop: 2,
  },
});
