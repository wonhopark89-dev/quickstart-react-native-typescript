import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  PanResponder,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import styled from "styled-components/native";
import { getCoins } from "./fetchers";
import { useQuery } from "react-query";
import { useAssets } from "expo-asset";

const BLACK = "#1E272E";
const GREY = "#485460";
const GREEN = "#2ECC71";
const RED = "#E74C3C";

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK};
`;

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;

const Word = styled.Text`
  font-size: 38px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: transparent;
  padding: 20px;
  z-index: 10;
  position: absolute;
`;

const DragAndDrop = () => {
  const [index, setIndex] = useState(0);

  const { data, refetch } = useQuery("coins", getCoins);
  const cleanedList = data
    ?.filter((coin) => coin.rank !== 0)
    .filter((coin) => coin.is_active === true)
    .slice(0, 100);

  const nextIcon = () => {
    setIndex((prev) => prev + 1);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 10,
      }),
      Animated.spring(opacity, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };
  // Value
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleOne = position.y.interpolate({
    inputRange: [-300, -80],
    outputRange: [2, 1],
    extrapolate: "clamp",
  });
  const scaleTwo = position.y.interpolate({
    inputRange: [80, 300],
    outputRange: [1, 2],
    extrapolate: "clamp",
  });

  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0, // same as {x:0, y:0}
    useNativeDriver: true,
  });

  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    duration: 100,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    duration: 100,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -250 || dy > 250) {
          // drop
          Animated.sequence([
            Animated.parallel([onDropScale, onDropOpacity]),
            Animated.timing(position, {
              toValue: 0,
              duration: 0,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(nextIcon);
        } else {
          Animated.parallel([onPressOut, goHome]).start();
        }
      },
    })
  ).current;

  const [assets] = useAssets(
    cleanedList?.map(
      (item) =>
        `https://cryptoicon-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`
    )
  );

  if (!assets) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#1e272e",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  // state
  return (
    <Container>
      <Edge>
        <WordContainer style={{ transform: [{ scale: scaleOne }] }}>
          <Word color={GREEN}>사다</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard
          {...panResponder.panHandlers}
          style={{
            opacity,
            transform: [...position.getTranslateTransform(), { scale }],
          }}
        >
          <Image
            source={{ uri: assets[index].uri }}
            style={{ width: 150, height: 150, borderRadius: 75 }}
          />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer style={{ transform: [{ scale: scaleTwo }] }}>
          <Word color={RED}>팔다</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
};

export default DragAndDrop;
