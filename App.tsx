import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from "react";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components/";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";


import theme from "./src/global/styles/theme";

import { Routes } from "./src/routes";
import {AppRoutes} from './src/routes/app.routes';

import {SignIn} from './src/screens/SignIn';
import { AuthProvider } from './src/./hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
          <AuthProvider>
          <Routes />
          </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
