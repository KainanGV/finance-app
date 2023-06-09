// import 'react-native-gesture-handler';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from "./src/global/styles/theme"
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import { StatusBar } from 'react-native';
import {
  
} from "@expo-google-fonts/poppins"
import AppLoading from 'expo-app-loading';
import {Routes} from "./src/routes"
import {AuthProvider, useAuth} from "./src/hooks/auth"

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const {userStorageLoading} = useAuth()

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="light-content"
        />
        
          <AuthProvider>
            <Routes />
          </AuthProvider>
      </ThemeProvider>
  );
}
