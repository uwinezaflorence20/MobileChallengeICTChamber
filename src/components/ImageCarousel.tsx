import { Image } from 'expo-image';
import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/useTheme';
import type { DogImage } from '../types';

const { width } = Dimensions.get('window');

export function ImageCarousel({ images }: { images: DogImage[] }) {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <View style={[styles.wrap, { backgroundColor: theme.chip }]}>
        <Text style={{ color: theme.subtext }}>No photos available</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={{ width, height: width }}
            contentFit="cover"
            transition={200}
          />
        )}
      />
      <View style={styles.dots}>
        {images.map((img, i) => (
          <View
            key={img.id}
            style={[
              styles.dot,
              { backgroundColor: i === index ? theme.primary : 'rgba(255,255,255,0.5)' },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width,
    height: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});
