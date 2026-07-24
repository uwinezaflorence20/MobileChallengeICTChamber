import { useColorScheme } from 'react-native';
import { colors, ThemeColors } from './colors';

export function useTheme(): { theme: ThemeColors; isDark: boolean } {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return { theme: isDark ? colors.dark : colors.light, isDark };
}
