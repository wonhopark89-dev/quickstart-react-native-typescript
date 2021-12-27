import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Asset, useAssets } from 'expo-asset';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import Stack from './navigation/Stack';

export default function App() {
  const [assets] = useAssets([require('./oss_logo.png')]);
  const [loaded, error] = Font.useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}
