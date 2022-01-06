import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Animated, TouchableOpacity } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
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
const AnimatedButton = Animated.createAnimatedComponent(Button);

export default function App() {
  const [y, setY] = useState(0);
  const [intervalId, setInteralId] = useState(null);

  const moveUp = () => {
    const id = setInterval(() => setY((prev) => prev + 10), 500);
    setInteralId(id);
  };

  useEffect(() => {
    if (y === 200) {
      clearInterval(intervalId);
    }
  }, [y, intervalId]);
  return (
    <Container>
      <Button onPress={moveUp} style={{ transform: [{ translateY: y }] }} />
    </Container>
  );
}
