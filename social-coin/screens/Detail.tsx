import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { history, info } from '../api';
import { Icon } from '../components/Coin';
import { InNavStackProps } from '../navigators/InNav';
import { BLACK_COLOR } from '../colors';
import { VictoryChart, VictoryLine, VictoryScatter } from 'victory-native';

const Container = styled.ScrollView`
  background-color: ${BLACK_COLOR};
`;

// {"timestamp":"2022-01-31T16:00:00Z","price":2630.77,"volume_24h":13356600959,"market_cap":314084443530}
interface CoinDetailProps {
  timestamp: string;
  price: number;
}

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

  // querykey 를 배열로 사용할 경우, cache 에 대한 장점이있다 ( id )
  const { isLoading: infoLoading, data: infoData } = useQuery(['coinInfo', id], () => info(id));
  const { isLoading: historyLoading, data: historyData } = useQuery<CoinDetailProps[]>(['coinHistory', id], () =>
    history(id),
  );

  const [victoryData, setVictoryData] = useState<{ x: number; y: number }[] | null>(null);

  useEffect(() => {
    if (historyData) {
      // console.log(JSON.stringify(historyData));
      setVictoryData(historyData.map((detail) => ({ x: new Date(detail.timestamp).getTime(), y: detail.price })));
    }
  }, [historyData]);

  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={360}>
          <VictoryLine
            animate={{ duration: 300 }}
            interpolation={'monotoneX'}
            data={victoryData}
            style={{ data: { stroke: '#1abc9c', strokeWidth: 3 } }}
          />
          <VictoryScatter data={victoryData} style={{ data: { fill: '#1aff9f' } }} />
        </VictoryChart>
      ) : null}
    </Container>
  );
};
export default Detail;
