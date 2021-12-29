import React from 'react';
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
      sceneContainerStyle={{ backgroundColor: theme.tabBar }}
      screenOptions={{
        /**
         * @param: unmountOnBlur
         * 값이 true 일 때,
         * 화면이 벗어나면, 그 화면에 대한 컴포넌트를 메모리에서 삭제함
         * React-Query 를 사용하지 않으면 매번 다시 요청해야함.
         * React-Query 에서 데이터를 캐싱하고 있어서 다시 fetch 안함
         */
        unmountOnBlur: false,
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
