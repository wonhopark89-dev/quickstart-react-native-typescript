import React from 'react';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import OneRootScreen from '~/screens/bottomTabs/oneStack/OneRootScreen';
import RandomNumberScreen from '~/screens/bottomTabs/oneStack/RandomNumberScreen';
import {RouteProp} from '@react-navigation/native';

export type OneStackParamList = {
  OneRootScreen: undefined;
  RandomNumberScreen: undefined;
};

const OneStack = createStackNavigator<OneStackParamList>();

export interface OneStackNavigationProps<RouteName extends keyof OneStackParamList> {
  navigation: StackNavigationProp<OneStackParamList, RouteName>;
  route: RouteProp<OneStackParamList, RouteName>;
}

export const OneStackNavigator = () => (
  <OneStack.Navigator
    initialRouteName={'OneRootScreen'}
    screenOptions={{
      cardOverlayEnabled: true,
      headerShown: false,
    }}
    headerMode={'screen'}>
    <OneStack.Screen name={'OneRootScreen'} component={OneRootScreen} />
    <OneStack.Screen name={'RandomNumberScreen'} component={RandomNumberScreen} />
  </OneStack.Navigator>
);

export default OneStackNavigator;
