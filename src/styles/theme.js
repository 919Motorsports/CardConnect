
import { DefaultTheme } from 'react-native-paper';

export const colors = {
  primary: '#4C6EF5',
  secondary: '#FF7043',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  error: '#B00020',
  text: '#212121',
  disabled: '#9E9E9E',
  placeholder: '#9E9E9E',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  roundness: 8,
}; 