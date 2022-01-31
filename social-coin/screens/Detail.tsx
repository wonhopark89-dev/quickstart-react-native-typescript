import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { history, info } from '../api';
import { Icon } from '../components/Coin';
import { InNavStackProps } from '../navigators/InNav';

const Container = styled.ScrollView``;

const Detail = ({ navigation, route }: InNavStackProps<'Detail'>) => {
  const { symbol, id } = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: false, // only ios ( true 일때,  스크롤이 올라가면 작아지는 효과 )
      headerTitle: () => (
        <Icon
          source={{
            uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
          }}
        />
      ),
    });
  }, []);
  const { isLoading: infoLoading, data: infoData } = useQuery(['coinInfo', id], () => info(id));
  const { isLoading: historyLoading, data: historyData } = useQuery(['coinHistory', id], () => history(id));

  return <Container />;
};
export default Detail;
