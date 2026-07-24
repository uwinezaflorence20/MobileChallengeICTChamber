import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BreedsProvider } from '../src/context/BreedsContext';
import { FavoritesProvider } from '../src/context/FavoritesContext';
import { useTheme } from '../src/theme/useTheme';

export default function RootLayout() {
  const { theme, isDark } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FavoritesProvider>
          <BreedsProvider>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="breed/[id]"
                options={{
                  headerShown: true,
                  headerTitle: '',
                  headerBackTitle: 'Back',
                  headerStyle: { backgroundColor: theme.background },
                  headerShadowVisible: false,
                  headerTintColor: theme.primary,
                }}
              />
            </Stack>
          </BreedsProvider>
        </FavoritesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
