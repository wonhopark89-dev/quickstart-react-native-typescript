import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { useColorScheme } from 'react-native';
import { getTheme } from '../color';
import { Ionicons } from '@expo/vector-icons';

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
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600', marginTop: -4 },
        headerStyle: { backgroundColor: theme.header },
        headerTitleStyle: { color: theme.headerTitle },
      }}>
      <Tab.Screen
        name={'Movies'}
        component={Movies}
        options={{
          tabBarIcon: ({ focused, size, color }) => <Ionicons name={'film-outline'} color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={'TV'}
        component={Tv}
        options={{ tabBarIcon: ({ focused, size, color }) => <Ionicons name={'tv'} color={color} size={size} /> }}
      />
      <Tab.Screen
        name={'Search'}
        component={Search}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
