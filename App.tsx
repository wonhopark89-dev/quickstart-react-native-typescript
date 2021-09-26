import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootScreen from '~/RootScreen';

const App = () => {
  return (
    <NavigationContainer>
      <RootScreen />
    </NavigationContainer>
  );
};

export default App;
