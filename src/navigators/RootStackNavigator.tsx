import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import BottomTabStackNavigator from '~/navigators/BottomTabStackNavigator';

type RootStackParamList = {
  BottomStackScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => (
  <RootStack.Navigator
    initialRouteName={'BottomStackScreen'}
    defaultScreenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <RootStack.Screen name={'BottomStackScreen'} component={BottomTabStackNavigator} options={{headerShown: false}} />
  </RootStack.Navigator>
);

export default RootStackNavigator;
