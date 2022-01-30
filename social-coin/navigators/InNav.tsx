import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import { BLACK_COLOR } from '../colors';

type InNavParamList = {
  Home: undefined;
};

const InNav = createNativeStackNavigator<InNavParamList>();

const InNavStackNavigator = () => (
  <InNav.Navigator
    screenOptions={{
      presentation: 'modal',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: BLACK_COLOR,
      },
    }}>
    <InNav.Screen name={'Home'} options={{ title: '코인' }} component={Home} />
  </InNav.Navigator>
);

export default InNavStackNavigator;
