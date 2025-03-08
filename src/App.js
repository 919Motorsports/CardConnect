import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator';
import AuthProvider from './components/auth/AuthProvider';
import { store } from './store';
import { theme } from './styles/theme';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App; 