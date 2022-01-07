import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Easing, TouchableOpacity } from "react-native";

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
  const Y = useRef(new Animated.Value(0)).current;

  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 200 : -200,
      useNativeDriver: true,
      easing: Easing.cubic,
    }).start(() => toggleUp());
  };

  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox style={{ transform: [{ translateY: Y }] }} />
      </TouchableOpacity>
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
