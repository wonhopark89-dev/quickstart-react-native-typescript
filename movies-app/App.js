import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';

export default function App() {
  const [ready, setReady] = useState(false);

  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font);
    await Asset.loadAsync(require('./oss_logo.png'));
    await Image.prefetch(
      'https://d33wubrfki0l68.cloudfront.net/01eeacc4cb1ecbbd986af3acbec3addd264170c7/2673a/img/showcase/qq.png',
    ); // don`t recommend
    // await new Promise((resolve) => setTimeout(resolve, 3000));
  };

  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }

  return <Text>We are done</Text>;
}
