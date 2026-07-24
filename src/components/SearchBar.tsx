import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '../theme/useTheme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search breeds…' }: Props) {
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: theme.chip, borderColor: theme.border }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.subtext}
        style={[styles.input, { color: theme.text }]}
        autoCorrect={false}
        clearButtonMode="while-editing"
        keyboardAppearance={isDark ? 'dark' : 'light'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  input: {
    height: 44,
    fontSize: 16,
  },
});
