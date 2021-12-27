import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Two')}>
    <View>
      <Text>One</Text>
    </View>
  </TouchableOpacity>
);

const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Three')}>
    <View>
      <Text>Two</Text>
    </View>
  </TouchableOpacity>
);

const ScreenThree = ({ navigation: { goBack, setOptions } }) => (
  <TouchableOpacity onPress={() => setOptions({ title: 'Hello!' })}>
    <View>
      <Text>Three</Text>
    </View>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();
const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name={'One'} component={ScreenOne} />
    <NativeStack.Screen name={'Two'} component={ScreenTwo} />
    <NativeStack.Screen name={'Three'} component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
