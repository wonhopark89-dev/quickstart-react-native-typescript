import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Write from './screens/Write';

type TabsParam = {
  Home: undefined;
  Write: undefined;
};

const Tabs = createNativeStackNavigator<TabsParam>();

export interface TabsNavigationProps<RouteName extends keyof TabsParam> {
  navigation: NativeStackNavigationProp<TabsParam, RouteName>;
}

const Navigator = () => (
  <Tabs.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false, presentation: 'modal' }}>
    <Tabs.Screen name={'Home'} component={Home} />
    <Tabs.Screen name={'Write'} component={Write} />
  </Tabs.Navigator>
);

export default Navigator;
