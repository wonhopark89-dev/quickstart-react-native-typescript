import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OneScreen from '~/screens/bottomTabs/OneScreen';
import TwoScreen from '~/screens/bottomTabs/TwoScreen';
import ThreeScreen from '~/screens/bottomTabs/ThreeScreen';
import FourScreen from '~/screens/bottomTabs/FourScreen';

type BottomTabStackParamList = {
  OneScreen: undefined;
  TwoScreen: undefined;
  ThreeScreen: undefined;
  FourScreen: undefined;
};

const BottomTabStack = createBottomTabNavigator<BottomTabStackParamList>();

const BottomTabStackNavigator = () => (
  <BottomTabStack.Navigator initialRouteName={'OneScreen'} backBehavior={'none'}>
    <BottomTabStack.Screen name={'OneScreen'} component={OneScreen} />
    <BottomTabStack.Screen name={'TwoScreen'} component={TwoScreen} />
    <BottomTabStack.Screen name={'ThreeScreen'} component={ThreeScreen} />
    <BottomTabStack.Screen name={'FourScreen'} component={FourScreen} />
  </BottomTabStack.Navigator>
);

export default BottomTabStackNavigator;
