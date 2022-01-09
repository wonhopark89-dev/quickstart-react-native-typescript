import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  Pressable,
  TouchableOpacity,
} from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

// Animated 컴포넌트 만드는 방법(1) with styled-components
const Box1 = styled(Animated.createAnimatedComponent(TouchableOpacity))`
  background-color: tomato;
  width: 50px;
  height: 50px;
`;

// Animated 컴포넌트 만드는 방법(2) with styled-components
const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, { dx, dy }) => {
        console.log("Finger Moving");
        POSITION.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderGrant: () => {
        console.log("Touch Started");
        POSITION.setOffset({
          // 시작을 현재 위치에서  ( 0,0 이 아닌ㄷ )
          x: POSITION.x._value,
          y: POSITION.y._value,
        });
      },
      onPanResponderRelease: () => {
        console.log("Touch Finished");
        POSITION.flattenOffset();
        // POSITION.setValue({ x: 0, y: 0 }); // 애니메이션 없이 바로 이동해버림
        // Animated.spring(POSITION, {
        //   toValue: { x: 0, y: 0 },
        //   useNativeDriver: false,
        // }).start();
      },
    })
  ).current;

  const opacityValue = POSITION.y.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.5, 1],
  });

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-200, 200],
    outputRange: [50, 0],
  });

  const backgroundColor = POSITION.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["rgb(255,0,255)", "rgb(0,0,255)"],
  });

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          backgroundColor,
          borderRadius,
          opacity: opacityValue,
          transform: [...POSITION.getTranslateTransform()],
        }}
      />
    </Container>
  );
}

// TouchableOpacity => 애니메이션이 자연스럽게 먹히지 않음
// View, ScrollView 추천

// Animated.Spring
// Bounce 는 speed 와 같이 사용
// friction 는 tension 와 같이 사용

// useRef 사용해서, Animated 값이 리렌더링 후에도 유지할 수 있도록 보호한다.

// Y.addListener(() => console.log("Animated State: " + JSON.stringify(Y))); // 애니메이션 value 보고 싶을때
// console.log("Component State: " + JSON.stringify(Y)); // 리렌더링 되지 않음 ( Animation 이 react component 에서 실행된 것이 아님 )

// useNativeDriver: true 일때 네이티브 실행 할수 없는 애니메이션도 있다, ( backgroundColor 같은 ),
// useNativeDriver 를 false 로 하거나, 하는건 선택의 문제 ( 퍼포먼스 )

// 애니메이션 초기값 위치와 애니메이션 sequence 의 마지막 위치를 잘 계산해서 자연스럽게.
// ...POSITION.getTranslateTransform() => 축약

// panResponder => dx, dy 사용가가 움직인 거리
// dx,dy => 손가락을 떼면 다시 0 부터 시작

// onPanResponderRelease : 터치가 끝났을 때 작동
// POSITION.setValue({ x: 0, y: 0 }); // 애니메이션 없이 바로 이동해버림
// Animated.spring(POSITION, {
//     toValue: { x: 0, y: 0 },
//     useNativeDriver: false,
// }).start();
