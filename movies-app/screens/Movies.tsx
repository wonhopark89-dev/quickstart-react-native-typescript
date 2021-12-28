import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-web-swiper';

const API_KEY = '99c145303e44f10255f3c26a1a745124';

// https://api.themoviedb.org/3/movie/now_playing?api_key=99c145303e44f10255f3c26a1a745124&language=en-US&page=1&region=KR

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  const getNowPlaying = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`);
  };

  return (
    <Container>
      <Swiper loop timeout={3.5} controlsEnabled={false} containerStyle={{ width: '100%', height: 300 }}>
        <View style={{ backgroundColor: 'red' }}></View>
        <View style={{ backgroundColor: 'orange' }}></View>
        <View style={{ backgroundColor: 'red' }}></View>
      </Swiper>
    </Container>
  );
};

export default Movies;
