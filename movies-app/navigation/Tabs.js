import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { useColorScheme } from 'react-native';
import { getTheme } from '../color';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';
  const theme = getTheme(isDark);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.tabBar },
        tabBarActiveTintColor: theme.tabBarActiveTint,
        tabBarInactiveTintColor: theme.tabBarInactiveTint,
        headerStyle: { backgroundColor: theme.header },
        headerTitleStyle: { color: theme.headerTitle },
      }}>
      <Tab.Screen name={'Movies'} component={Movies} />
      <Tab.Screen name={'Tv'} component={Tv} />
      <Tab.Screen name={'Search'} component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
