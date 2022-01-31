import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useQuery } from 'react-query';
import { coins } from '../api';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { BLACK_COLOR } from '../colors';
import Coin from '../components/Coin';
import { InNavStackProps } from '../navigators/InNav';

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Loader = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  justify-content: center;
  align-items: center;
`;

interface CoinsProps {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
}

const Home = ({ navigation }: InNavStackProps<'Home'>) => {
  const { isLoading, data } = useQuery<CoinsProps[], Error>('coins', coins);
  const [cleanData, setCleanData] = useState<CoinsProps[]>([]);

  useEffect(() => {
    if (data) {
      setCleanData(data?.filter((coin) => coin.rank !== 0 && coin.is_active && !coin.is_new));
    }
  }, [data]);

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color={'white'} size={'large'} />
      </Loader>
    );
  }

  // const a = () => navigation.navigate("Detail", { })

  return (
    <Container>
      <FlatList
        data={cleanData}
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between' }} //numColumns 사용시에만
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <Coin symbol={item.symbol} id={item.id} index={index} />}
      />
    </Container>
  );
};

export default Home;
