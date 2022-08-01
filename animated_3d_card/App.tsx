import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {BackgroundGradient} from './components/BackgroundGradient';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HEIGHT = 256;
const WIDTH = SCREEN_WIDTH * 0.9;

const CARD_HEIGHT = HEIGHT - 10;
const CARD_WIDTH = WIDTH - 10;

const App = () => {
  const gesture = Gesture.Pan();

  return (
    <View style={styles.container}>
      <BackgroundGradient width={WIDTH} height={HEIGHT} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={{
            height: CARD_HEIGHT,
            width: CARD_WIDTH,
            backgroundColor: 'black',
            position: 'absolute',
            borderRadius: 20,
            zIndex: 300, // Animated 보이는 부분
            transform: [
              {perspective: 300},
              {rotateX: '10deg'},
              {rotateY: '-10deg'},
            ],
          }}
        />
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <App />
    </GestureHandlerRootView>
  );
};
