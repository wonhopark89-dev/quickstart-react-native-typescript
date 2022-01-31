import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { RootStackProps } from "../navigation/RootNavigator";

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 10,
    marginVertical: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "cyan",
  },
});

const Container = styled.View`
  flex: 1;
  background-color: #262629;
  justify-content: center;
  padding: 10px 20px;
`;

const Home = ({ navigation: { navigate } }: RootStackProps<"Home">) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => navigate("Tinder")} style={styles.btn}>
        <Text style={styles.title}>{`틴더 애니메이션`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate("DragAndDrop")}
        style={styles.btn}
      >
        <Text style={styles.title}>{`드래그앤드랍 애니메이션`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate("DragAndDrop2")}
        style={styles.btn}
      >
        <Text style={styles.title}>{`드래그앤드랍(코인) 애니메이션`}</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Home;
