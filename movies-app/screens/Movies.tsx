import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, useColorScheme, View } from 'react-native';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
const API_KEY = '99c145303e44f10255f3c26a1a745124';

// https://api.themoviedb.org/3/movie/now_playing?api_key=99c145303e44f10255f3c26a1a745124&language=en-US&page=1&region=KR

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.FlatList`
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

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  const isDark = useColorScheme() === 'dark';
  const [loading, setLoading] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

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
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trending}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              keyExtractor={(item) => item.id + ''}
              renderItem={({ item }) => (
                <VMedia
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcoming}
      keyExtractor={(item) => item.id + ''}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  );
};

export default Movies;

// <Container refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
//   <Swiper
//       horizontal
//       loop
//       autoplay
//       autoplayTimeout={3.5}
//       showsPagination={false}
//       containerStyle={{ marginBottom: 30, width: '100%', height: SCREEN_HEIGHT / 4 }}>
//     {nowPlaying.map((movie, index) => (
//         <Slide
//             key={movie.id}
//             backdropPath={movie.backdrop_path}
//             posterPath={movie.poster_path}
//             originalTitle={movie.original_title}
//             voteAverage={movie.vote_average}
//             overview={movie.overview}
//         />
//     ))}
//   </Swiper>
//   <ListContainer>
//     <ListTitle>Trending Movies</ListTitle>
//     <TrendingScroll
//         data={trending}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 20 }}
//         ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
//         keyExtractor={(item) => item.id + ''}
//         renderItem={({ item }) => (
//             <VMedia posterPath={item.poster_path} originalTitle={item.original_title} voteAverage={item.vote_average} />
//         )}
//     />
//   </ListContainer>
//   <ListTitle>Coming Soon</ListTitle>
//   <FlatList
//       data={upcoming}
//       keyExtractor={(item) => item.id + ''}
//       ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
//       renderItem={({ item }) => (
//           <HMedia
//               posterPath={item.poster_path}
//               originalTitle={item.original_title}
//               overview={item.overview}
//               releaseDate={item.release_date}
//           />
//       )}
//   />
// </Container>
