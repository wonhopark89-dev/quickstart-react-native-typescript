import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import { BLACK_COLOR } from '../colors';
import { RouteProp } from '@react-navigation/native';
import Detail from '../screens/Detail';

type InNavParamList = {
  Home: undefined;
  Detail: { symbol: string; id: string };
};

const InNav = createNativeStackNavigator<InNavParamList>();

export interface InNavStackProps<RouteName extends keyof InNavParamList> {
  navigation: NativeStackNavigationProp<InNavParamList, RouteName>;
  route: RouteProp<InNavParamList, RouteName>;
}

export type InNavProp = NativeStackScreenProps<InNavParamList>; // useNavigation 사용을 위함

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
    <InNav.Screen name={'Detail'} component={Detail} />
  </InNav.Navigator>
);

export default InNavStackNavigator;
