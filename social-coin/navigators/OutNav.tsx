import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Join from '../screens/Join';
import { BLACK_COLOR } from '../colors';

type OutNavParamList = {
  Login: undefined;
  Join: undefined;
};

const OutNav = createNativeStackNavigator<OutNavParamList>();

export interface OutNavStackProps<RouteName extends keyof OutNavParamList> {
  navigation: NativeStackNavigationProp<OutNavParamList, RouteName>;
}

const OutNavStackNavigator = () => (
  <OutNav.Navigator
    screenOptions={{
      presentation: 'modal',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: BLACK_COLOR,
      },
    }}>
    <OutNav.Screen name={'Login'} component={Login} />
    <OutNav.Screen name={'Join'} component={Join} />
  </OutNav.Navigator>
);

export default OutNavStackNavigator;
