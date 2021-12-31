import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvApi, TVResponse } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    isLoading: todayIsLoading,
    data: todayData,
    // isRefetching: todayRefetching,
  } = useQuery<TVResponse>(['tv', 'today'], tvApi.airingToday);
  const {
    isLoading: topIsLoading,
    data: topData,
    // isRefetching: topRefetching,
  } = useQuery<TVResponse>(['tv', 'top'], tvApi.topRated);
  const {
    isLoading: trendingIsLoading,
    data: trendingData,
    // isRefetching: trendingRefetching,
  } = useQuery<TVResponse>(['tv', 'trending'], tvApi.trending);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  };

  const isLoading = todayIsLoading || topIsLoading || trendingIsLoading;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ paddingVertical: 30 }}>
      {trendingData ? <HList title={'Trending TV'} data={trendingData.results} /> : null}
      {todayData ? <HList title={'Airing TV'} data={todayData.results} /> : null}
      {topData ? <HList title={'Top Rated TV'} data={topData.results} /> : null}
    </ScrollView>
  );
};

export default Tv;
