import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Animated, TouchableOpacity } from "react-native";

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
  const Y = new Animated.Value(0);

  const moveUp = () => {
    Animated.timing(Y, {
      toValue: 200,
      useNativeDriver: true,
    }).start();
  };

  Y.addListener(() => console.log(Y)); // 애니메이션 value 보고 싶을때

  console.log(Y); // 리렌더링 되지 않음 ( Animation 이 react component 에서 실행된 것이 아님 )

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
