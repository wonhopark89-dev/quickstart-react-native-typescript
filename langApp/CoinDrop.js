import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "react-query";
import { getCoins } from "./fetchers";
import { useAssets } from "expo-asset";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #1e272e;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: #e098ae;
  width: 280px;
  height: 320px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
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

export default function CoinDrop() {
  const { data, refetch, isLoading, isRefetching } = useQuery(
    "coins",
    getCoins
  );
  const cleanedList = data
    ?.filter((coin) => coin.rank !== 0)
    .filter((coin) => coin.is_active === true)
    .slice(0, 100);

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
    position.setValue(0);
    setIndex((prev) => prev + 1);
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
        if (dx < -250) {
          goLeft.start(onDismiss);
        } else if (dx > 250) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;

  const [assets, error] = useAssets(
    cleanedList?.map(
      (info) =>
        `https://cryptoicon-api.vercel.app/api/icon/${info.symbol.toLowerCase()}`
    )
  );

  if (assets === undefined) {
    return <ActivityIndicator size={"large"} color={"blue"} />;
  }

  return (
    <>
      {isLoading || isRefetching ? (
        <ActivityIndicator size={"large"} color={"blue"} />
      ) : (
        <Container>
          <CardContainer>
            <Card style={{ transform: [{ scale: secondScale }] }}>
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 20,
                  marginBottom: 10,
                }}
                source={{
                  uri: assets[index + 1].localUri,
                }}
              />
            </Card>
            <Card
              {...panResponder.panHandlers}
              style={{
                transform: [
                  { scale },
                  { translateX: position },
                  { rotateZ: rotation },
                ],
              }}
            >
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 20,
                  marginBottom: 10,
                }}
                source={{
                  uri: assets[index].localUri,
                }}
              />
              <Text
                style={{ fontSize: 28, color: "white", fontWeight: "bold" }}
              >
                {assets[index].name}
              </Text>
            </Card>
          </CardContainer>
          <BtnContainer>
            <Btn onPress={closePress}>
              <FontAwesome5 name="heart-broken" size={50} color="white" />
            </Btn>
            <Btn onPress={checkPress}>
              <FontAwesome5 name="heart" size={50} color="white" />
            </Btn>
          </BtnContainer>
        </Container>
      )}
    </>
  );
}
