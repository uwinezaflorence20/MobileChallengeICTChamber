import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/useTheme';

export function StatBox({ label, value }: { label: string; value: string }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: theme.chip }]}>
      <Text style={[styles.value, { color: theme.primary }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.subtext }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '800',
  },
  label: {
    fontSize: 11,
    marginTop: 2,
  },
});
