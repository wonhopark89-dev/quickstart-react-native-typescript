import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';

type InNavParamList = {
  Home: undefined;
};

const InNav = createNativeStackNavigator<InNavParamList>();

const InNavStackNavigator = () => (
  <InNav.Navigator>
    <InNav.Screen name={'Home'} component={Home} />
  </InNav.Navigator>
);

export default InNavStackNavigator;
