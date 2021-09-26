import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TempScreen from '~/screens/TempScreen';

export type OneStackParamList = {
  TempScreen: undefined;
};

const OneStack = createStackNavigator<OneStackParamList>();

const OneStackNavigator = () => (
  <OneStack.Navigator
    screenOptions={{
      cardOverlayEnabled: true,
      headerShown: false,
    }}
    headerMode={'screen'}
    mode={'modal'}>
    <OneStack.Screen name={'TempScreen'} component={TempScreen} />
  </OneStack.Navigator>
);

export default OneStackNavigator;
