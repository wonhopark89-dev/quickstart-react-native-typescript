import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import Poster from '../components/Poster';
const API_KEY = '99c145303e44f10255f3c26a1a745124';

// https://api.themoviedb.org/3/movie/now_playing?api_key=99c145303e44f10255f3c26a1a745124&language=en-US&page=1&region=KR

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 6px;
  margin-bottom: 4px;
`;

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const Votes = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 10px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 20px;
  flex-direction: row;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.9;
  width: 80%;
`;

const Release = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  const isDark = useColorScheme() === 'dark';
  const [loading, setLoading] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
    ).json();

    setTrending(results);
  };

  const getUpcomping = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
    ).json();

    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
    ).json();

    setNowPlaying(results);
    setLoading(false);
  };

  const getData = async () => {
    // wait for all of them
    await Promise.all([getTrending(), getUpcomping(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator size={'large'} />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsPagination={false}
        containerStyle={{ marginBottom: 30, width: '100%', height: SCREEN_HEIGHT / 4 }}>
        {nowPlaying.map((movie, index) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle isDark={isDark}>Trending Movies</ListTitle>
        <TrendingScroll horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20 }}>
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 ? '...' : null}
              </Title>
              <Votes>{movie.vote_average > 0 ? `⭐️ ${movie.vote_average}/10` : `Coming soon`}</Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ListTitle>Coming Soon</ListTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {' '}
              {new Date(movie.release_date).toLocaleDateString('ko', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Release>
            <Overview>
              {movie.overview !== '' && movie.overview.length > 80
                ? `${movie.overview.slice(0, 140)}...`
                : movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};

export default Movies;
