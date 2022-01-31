import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, PanResponder, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import icons from "../data/icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 1px 1px 10px rgba(255, 0, 0, 0.6);
  position: absolute;
`;

const Btn = styled.TouchableOpacity`
  margin: 0 5px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;
const Tinder = () => {
  const [index, setIndex] = useState(0);
  const position = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current; // 1 = 100%
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });

  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp",
  });

  const onDismiss = () => {
    scale.setValue(1);
    position.setValue(0); // 중앙으로 순간이동하는 것 처럼 ( 애니메이션 없이 )
    setIndex((prev) => prev + 1);
    // Animated.timing(position, { toValue: 0, useNativeDriver: true }).start();
  };

  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restSpeedThreshold: 100,
    restDisplacementThreshold: 100,
  });

  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restSpeedThreshold: 100,
    restDisplacementThreshold: 100,
  });

  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start();

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  const closePress = () => goLeft.start(onDismiss);
  const checkPress = () => goRight.start(onDismiss);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn(),
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -220) {
          goLeft.start(onDismiss);
        } else if (dx > 220) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;

  return (
    <Container>
      <CardContainer>
        <Card style={{ transform: [{ scale: secondScale }] }}>
          {/*@ts-ignore*/}
          <Ionicons name={icons[index + 1]} color={"#192a56"} size={98} />
        </Card>
        <Card
          {...panResponder.panHandlers}
          style={{
            transform: [
              { scale },
              { translateX: position },
              { rotateZ: rotation },
            ],
            elevation: 5, // for android
          }}
        >
          {/*@ts-ignore*/}
          <Ionicons name={icons[index]} color={"#192a56"} size={100} />
        </Card>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name={"close-circle"} color={"white"} size={60} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name={"checkmark-circle"} color={"white"} size={60} />
        </Btn>
      </BtnContainer>
    </Container>
  );
};

export default Tinder;
