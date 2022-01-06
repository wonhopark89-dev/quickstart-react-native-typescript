import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

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
