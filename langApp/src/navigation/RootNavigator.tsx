import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Tinder from "../screens/Tinder";
import DragAndDrop from "../screens/DragAndDrop";
import DragAndDrop2 from "../screens/DragAndDrop2";

type RootParamList = {
  Home: undefined;
  Tinder: undefined;
  DragAndDrop: undefined;
  DragAndDrop2: undefined;
};

const RootStack = createNativeStackNavigator<RootParamList>();

export interface RootStackProps<RouteName extends keyof RootParamList> {
  navigation: NativeStackNavigationProp<RootParamList, RouteName>;
}

const RootNavigator = () => (
  <RootStack.Navigator
    initialRouteName={"Home"}
    screenOptions={{
      presentation: "card",
      headerTintColor: "#E8E8E8",
      headerStyle: { backgroundColor: "#262629" },
    }}
  >
    <RootStack.Screen name={"Home"} component={Home} />
    <RootStack.Screen name={"Tinder"} component={Tinder} />
    <RootStack.Screen name={"DragAndDrop"} component={DragAndDrop} />
    <RootStack.Screen name={"DragAndDrop2"} component={DragAndDrop2} />
  </RootStack.Navigator>
);

export default RootNavigator;
