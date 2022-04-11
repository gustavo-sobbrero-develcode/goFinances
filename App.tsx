import React from "react";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components/";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  useFonts, 
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'
import { Register } from "./src/screens/Register";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider theme={theme}>
      <Register />
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}