import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BackgroundGradient} from './components/BackgroundGradient';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HEIGHT = 256;
const WIDTH = SCREEN_WIDTH * 0.9;

const CARD_HEIGHT = HEIGHT - 10;
const CARD_WIDTH = WIDTH - 10;

const App = () => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(event => {
      // console.log(event.x);
      // console.log(event.y);
      // STEP : 1
      // rotateX.value = event.x;
      // rotateY.value = event.y;
      rotateX.value = interpolate(
        event.y,
        [0, CARD_WIDTH],
        [10, -10],
        Extrapolation.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, CARD_HEIGHT],
        [-10, 10],
        Extrapolation.CLAMP,
      );
    })
    .onFinalize(() => {
      // rotateX.value = 0;
      // rotateY.value = 0;

      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  // topLeft (10deg, -10deg)
  // topRight (10deg, 10deg)
  // bottomRight (-10deg, 10deg)
  // bottomLeft (-10deg, - 10deg)

  const rStyle = useAnimatedStyle(() => {
    const rotateXvalue = `${rotateX.value}deg`;
    const rotateYvalue = `${rotateY.value}deg`;
    return {
      transform: [
        {perspective: 300},
        {rotateX: rotateXvalue},
        {rotateY: rotateYvalue},
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundGradient width={WIDTH} height={HEIGHT} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              height: CARD_HEIGHT,
              width: CARD_WIDTH,
              backgroundColor: 'black',
              position: 'absolute',
              borderRadius: 20,
              zIndex: 300, // Animated 보이는 부분
            },
            rStyle,
          ]}
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
