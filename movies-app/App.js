import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Asset, useAssets } from 'expo-asset';

export default function App() {
  const [assets] = useAssets([require('./oss_logo.png')]);
  const [loaded, error] = Font.useFonts(Ionicons.font);

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return <Text>We are done</Text>;
}
