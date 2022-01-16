import Realm from 'realm';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigator';
import AppLoading from 'expo-app-loading';

const FeelingSchema = {
  name: 'Feeling',
  properties: {
    _id: 'int',
    emotion: 'string',
    message: 'string',
  },
  primaryKey: '_id',
};

export default function App() {
  const [ready, setReady] = useState(false);
  const startLoading = async () => {
    const realm = await Realm.open({
      path: 'diaryDB',
      schema: [FeelingSchema],
    });
  };

  const onFinish = () => setReady(true);

  if (!ready) {
    return <AppLoading onError={console.error} onFinish={onFinish} startAsync={startLoading} />;
  }

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
