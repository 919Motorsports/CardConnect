import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanCardScreen from '../screens/ScanCardScreen';
import CardDetailsScreen from '../screens/CardDetailsScreen';
import RemindersScreen from '../screens/RemindersScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: true,
      }}
    >
      {!isAuthenticated ? (
        // Auth Screens
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // Main App Screens
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ScanCard" component={ScanCardScreen} />
          <Stack.Screen name="CardDetails" component={CardDetailsScreen} />
          <Stack.Screen name="Reminders" component={RemindersScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator; 