import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, useColorScheme, View } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { useQuery, useQueryClient } from 'react-query';
import { moviesApi } from '../api';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.FlatList``;

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

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const ComingSoonTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  const queryClinet = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    // refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(['movie', 'nowPlaying'], moviesApi.nowPlaying);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    // refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery(['movie', 'trending'], moviesApi.trending);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    // refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(['movie', 'upcoming'], moviesApi.upcoming);

  const onRefresh = async () => {
    /**
     * "movie" 키를 가진 fetcher 를 모드 refetch 한다
     * 키는 배열이 될 수 있으며, 일부만 일치하면 작동한다.
     * -> Categorizing 해서 사용하면 유용하다
     */
    await queryClinet.refetchQueries(['movie']);
  };

  const renderVMedia = ({ item }) => (
    <VMedia posterPath={item.poster_path} originalTitle={item.original_title} voteAverage={item.vote_average} />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const movieKeyExtractor = (item) => item.id + '';

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  console.log(refreshing);
  return loading ? (
    <Loader>
      <ActivityIndicator size={'large'} />
    </Loader>
  ) : (
    <Container
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{ marginBottom: 30, width: '100%', height: SCREEN_HEIGHT / 4 }}>
            {nowPlayingData.results.map((movie, index) => (
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
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trendingData.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              ItemSeparatorComponent={VSeparator}
              keyExtractor={movieKeyExtractor}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
