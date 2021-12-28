import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
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

// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

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
        containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}>
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
    </Container>
  );
};

export default Movies;
