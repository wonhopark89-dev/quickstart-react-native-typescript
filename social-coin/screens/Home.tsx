import * as React from 'react';
import styled from 'styled-components/native';
import { useQuery } from 'react-query';
import { coins } from '../api';
import { ActivityIndicator, FlatList } from 'react-native';
import { BLACK_COLOR } from '../colors';
import { useEffect, useState } from 'react';

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Coin = styled.View`
  align-items: center;
`;

const CoinName = styled.Text`
  color: white;
`;

const CoinSymbol = styled.Text`
  color: white;
`;

const Loader = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const { isLoading, data } = useQuery('coins', coins);
  const [cleanData, setCleanData] = useState([]);

  useEffect(() => {
    // @ts-ignore
    setCleanData(data?.filter((coin) => coin.rank !== 0 && coin.is_active && !coin.is_new));
  }, [data]);

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color={'white'} />
      </Loader>
    );
  }

  return (
    <Container>
      <FlatList
        data={cleanData}
        numColumns={5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Coin>
            <CoinName>{item.name}</CoinName>
            <CoinSymbol>{item.symbol}</CoinSymbol>
          </Coin>
        )}
      />
    </Container>
  );
};

export default Home;
