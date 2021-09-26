import React from 'react';
import {createStackNavigator, StackNavigationProp, TransitionPresets} from '@react-navigation/stack';
import BottomTabStackNavigator from '~/navigators/BottomTabStackNavigator';
import OneStackNavigator from '~/navigators/OneStackNavigator';

type RootStackParamList = {
  BottomStackScreen: undefined;
  //
  OneStackScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export type RootStackCompositeProp = StackNavigationProp<RootStackParamList>;

const RootStackNavigator = () => (
  <RootStack.Navigator
    initialRouteName={'BottomStackScreen'}
    // mode={'modal'}
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <RootStack.Screen name={'BottomStackScreen'} component={BottomTabStackNavigator} options={{headerShown: false}} />
    <RootStack.Screen name={'OneStackScreen'} component={OneStackNavigator} options={{headerShown: false}} />
  </RootStack.Navigator>
);

export default RootStackNavigator;
