import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TwoScreen from '~/screens/bottomTabs/TwoScreen';
import ThreeScreen from '~/screens/bottomTabs/ThreeScreen';
import FourScreen from '~/screens/bottomTabs/FourScreen';
import textStyle from '~/styles/TextStyle';
import palette from '~/styles/ColorStyle';
import OneStackNavigator from '~/navigators/OneStackNavigator';

type BottomTabStackParamList = {
  OneScreen: undefined;
  TwoScreen: undefined;
  ThreeScreen: undefined;
  FourScreen: undefined;
};

const BottomTabStack = createBottomTabNavigator<BottomTabStackParamList>();

const BottomTabStackNavigator = () => (
  <BottomTabStack.Navigator initialRouteName={'OneScreen'} backBehavior={'none'}>
    <BottomTabStack.Screen
      name={'OneScreen'}
      component={OneStackNavigator}
      options={{
        tabBarLabel: ({focused}) => (
          <Text style={[textStyle.regular20, {color: focused ? palette.primary : palette.gray}]}>{`One`}</Text>
        ),
      }}
    />
    <BottomTabStack.Screen
      name={'TwoScreen'}
      component={TwoScreen}
      options={{
        tabBarLabel: ({focused}) => (
          <Text style={[textStyle.regular20, {color: focused ? palette.primary : palette.gray}]}>{`Two`}</Text>
        ),
      }}
    />
    <BottomTabStack.Screen
      name={'ThreeScreen'}
      component={ThreeScreen}
      options={{
        tabBarLabel: ({focused}) => (
          <Text style={[textStyle.regular20, {color: focused ? palette.primary : palette.gray}]}>{`Three`}</Text>
        ),
      }}
    />
    <BottomTabStack.Screen
      name={'FourScreen'}
      component={FourScreen}
      options={{
        tabBarLabel: ({focused}) => (
          <Text style={[textStyle.regular20, {color: focused ? palette.primary : palette.gray}]}>{`Four`}</Text>
        ),
      }}
    />
  </BottomTabStack.Navigator>
);

export default BottomTabStackNavigator;
