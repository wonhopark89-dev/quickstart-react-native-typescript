import React from 'react';
import { TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import Poster from './Poster';
import { useNavigation } from '@react-navigation/native';

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.View`
  width: 60%;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  font-size: 14px;
  margin-top: 8px;
  color: ${(props) => (props.isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)')};
`;

const Votes = styled.Text<{ isDark: boolean }>`
  font-size: 12px;
  margin-top: 8px;
  color: ${(props) => (props.isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)')};
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({ backdropPath, posterPath, originalTitle, voteAverage, overview }) => {
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const goToDetail = () => navigation.navigate('Stack', { screen: 'Detail' });
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg source={{ uri: makeImgPath(backdropPath) }} />
        <BlurView tint={isDark ? 'dark' : 'light'} intensity={80} style={StyleSheet.absoluteFill}>
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{originalTitle}</Title>
              {voteAverage > 0 ? <Votes isDark={isDark}>⭐️ {voteAverage}/10</Votes> : null}
              <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
