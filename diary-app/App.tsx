import Realm from 'realm';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigator';
import AppLoading from 'expo-app-loading';
import { DBContext } from './context';

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
  const [realm, setRealm] = useState<Realm>();
  const startLoading = async () => {
    const connection = await Realm.open({
      path: 'diaryDB',
      schema: [FeelingSchema],
    });
    setRealm(connection);
  };

  const onFinish = () => setReady(true);

  if (!ready) {
    return <AppLoading onError={console.error} onFinish={onFinish} startAsync={startLoading} />;
  }

  return (
    <DBContext.Provider value={realm!}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
