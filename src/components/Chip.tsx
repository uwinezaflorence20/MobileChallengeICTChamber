import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/useTheme';

export function Chip({ label }: { label: string }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.chip, { backgroundColor: theme.chip }]}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
