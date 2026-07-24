import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/useTheme';

export function LoadingView({ label = 'Fetching good boys…' }: { label?: string }) {
  const { theme } = useTheme();
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text style={[styles.text, { color: theme.subtext }]}>{label}</Text>
    </View>
  );
}

export function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  const { theme } = useTheme();
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>🐾</Text>
      <Text style={[styles.text, { color: theme.text }]}>{message}</Text>
      <Pressable
        onPress={onRetry}
        style={[styles.retryButton, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.retryLabel}>Try again</Text>
      </Pressable>
    </View>
  );
}

export function EmptyView({ message }: { message: string }) {
  const { theme } = useTheme();
  return (
    <View style={styles.center}>
      <Text style={styles.emoji}>🐕</Text>
      <Text style={[styles.text, { color: theme.subtext }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  retryLabel: {
    color: '#fff',
    fontWeight: '700',
  },
});
