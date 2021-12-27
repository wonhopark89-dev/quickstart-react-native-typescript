import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const Btn = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate('Stack', { screen: 'Three' })}>
    <Title selected={true}>Movies</Title>
  </Btn>
);

export default Movies;
