import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/useTheme';

interface Props {
  active: boolean;
  onPress: () => void;
  size?: number;
  overlay?: boolean;
}

export function HeartButton({ active, onPress, size = 22, overlay = true }: Props) {
  const { theme } = useTheme();

  const backgroundColor = overlay ? 'rgba(0,0,0,0.35)' : theme.chip;
  const color = active ? theme.heart : overlay ? '#FFFFFF' : theme.subtext;

  return (
    <Pressable onPress={onPress} hitSlop={10} style={[styles.button, { backgroundColor }]}>
      <Text style={{ fontSize: size, color }}>{active ? '♥' : '♡'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
