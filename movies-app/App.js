import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);

  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require('./oss_logo.png'),
      'https://d33wubrfki0l68.cloudfront.net/01eeacc4cb1ecbbd986af3acbec3addd264170c7/2673a/img/showcase/qq.png',
    ]);
  };

  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }

  return <Text>We are done</Text>;
}
