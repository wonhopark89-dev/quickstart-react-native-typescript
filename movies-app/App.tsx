import AppLoading from 'expo-app-loading';
import React from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useAssets } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { useColorScheme } from 'react-native';

import { QueryClient, QueryClientProvider } from 'react-query';
import { dartTheme, lightTheme } from './myStyled';

const queryClient = new QueryClient();

export default function App() {
  const [assets] = useAssets([require('./oss_logo.png')]);
  const [loaded, error] = Font.useFonts(Ionicons.font);

  const isDark = useColorScheme() === 'dark';

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? dartTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
