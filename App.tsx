import React, {useState, useCallback, useEffect} from 'react';
// import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register';
import { ThemeProvider } from 'styled-components';
import theme from "./src/global/styles/theme"
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import { StatusBar, View } from 'react-native';
import { CategorySelect } from './src/screens/CategorySelect';
import * as SplashScreen from 'expo-splash-screen';
import {
  
} from "@expo-google-fonts/poppins"
import { Dashboard } from './src/screens/Dashboard';
import AppLoading from 'expo-app-loading';
import { FontDisplay } from 'expo-font';

// SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible while we fetch resources

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="light-content"
        />

        {/* <Dashboard /> */}
        <Register />
        {/* <CategorySelect /> */}
        
      </ThemeProvider>
  );
}
