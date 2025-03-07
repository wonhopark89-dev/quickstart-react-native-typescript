import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated3DCard from './src/Animated3DCard';
import ListAnimations from './src/ListAnimations';
import {Wallet} from './src/Wallet';

const App = () => {
  return (
    <View style={styles.container}>
      {/*<Animated3DCard />*/}
      {/*<ListAnimations />*/}
      <Wallet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <App />
    </GestureHandlerRootView>
  );
};
