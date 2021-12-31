import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Linking, StyleSheet, Text, View } from 'react-native';
import { Movie, moviesApi, TV, tvApi } from '../api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Poster from '../components/Poster';
import { makeImgPath } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from 'react-query';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import Loader from '../components/Loader';
import { getTheme } from '../color';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Background = styled.Image``;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
  align-self: flex-end;
  margin-left: 16px;
  font-weight: 500;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0;
`;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const Data = styled.View`
  padding: 0 20px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail: React.FC<DetailScreenProps> = ({ navigation: { setOptions }, route: { params } }) => {
  const isMovie = 'original_title' in params;
  const { isLoading, data } = useQuery(
    [isMovie ? 'movies' : 'tv', params.id],
    isMovie ? moviesApi.detail : tvApi.detail,
    // { enabled: 'original_title' in params }, // 위에 isMovie 로 판단하는걸로 수정
  );

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
  }, []);

  const openYoutubeLink = async (videoID: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl); // 앱 밖으로 나가서 브라우저에서 열리거나, 해당앱이 있으면 앱이 열림
    await WebBrowser.openBrowserAsync(baseUrl); // 앱 밖으로 나가지 않음
  };

  return (
    <Container>
      <Header>
        <Background style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(params.backdrop_path || '') }} />
        {/*Gradient Color Top to Bottom*/}
        <LinearGradient colors={['transparent', '#1e272e']} style={StyleSheet.absoluteFill} />
        <Column>
          <Poster path={params.poster_path || ''} />
          <Title>{'original_title' in params ? params.original_title : params.original_name}</Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) =>
          video.site === 'YouTube' ? (
            <VideoBtn key={video.key} onPress={() => openYoutubeLink(video.key)}>
              <Ionicons name={'logo-youtube'} color={getTheme().header} size={24} />
              <BtnText>{video.name}</BtnText>
            </VideoBtn>
          ) : null,
        )}
      </Data>
    </Container>
  );
};

export default Detail;
