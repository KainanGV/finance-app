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
import {NavigationContainer} from "@react-navigation/native"
import { AppRoutes } from './src/routes/app.routes';

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
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
  );
}
