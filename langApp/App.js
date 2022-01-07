import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Easing, Pressable, TouchableOpacity } from "react-native";

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

export default function App() {
  const [up, setUp] = useState(false);
  const Y = useRef(new Animated.Value(200)).current;

  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 200 : -200,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => toggleUp());
  };

  const opacityValue = Y.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [1, 0.5, 1],
  });

  const borderRadius = Y.interpolate({
    inputRange: [-200, 200],
    outputRange: [50, 0],
  });

  const backgroundColor = Y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["rgb(255,0,255)", "rgb(0,0,255)"],
  });

  const rotateY = Y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["-360deg", "360deg"],
  });

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            backgroundColor,
            borderRadius,
            opacity: opacityValue,
            transform: [{ rotateY }, { translateY: Y }],
          }}
        />
      </Pressable>
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
