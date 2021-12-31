import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvApi } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayIsLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(['tv', 'today'], tvApi.airingToday);
  const {
    isLoading: topIsLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(['tv', 'top'], tvApi.topRated);
  const {
    isLoading: trendingIsLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(['tv', 'trending'], tvApi.trending);

  const onRefresh = () => queryClient.refetchQueries(['tv']);

  const isLoading = todayIsLoading || topIsLoading || trendingIsLoading;
  const refreshing = todayRefetching || topRefetching || trendingRefetching;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ paddingVertical: 30 }}>
      <HList title={'Trending TV'} data={trendingData.results} />
      <HList title={'Airing TV'} data={todayData.results} />
      <HList title={'Top Rated TV'} data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
