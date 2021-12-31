import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import Detail from '../screens/Detail';
import { getTheme } from '../color';

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === 'dark';
  const theme = getTheme(isDark);

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: theme.header },
        headerTitleStyle: { color: theme.headerTitle },
      }}>
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
