import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../color';
import { TabsNavigationProps } from '../navigator';
import { useDB } from '../context';
import { FlatList } from 'react-native';

const View = styled.View`
  flex: 1;
  padding: 0 50px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const Record = styled.Text`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  overflow: hidden;
`;

const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;

const Message = styled.Text`
  font-size: 18px;
`;

const Separator = styled.View`
  height: 10px;
`;

const Home = ({ navigation: { navigate } }: TabsNavigationProps<'Home'>) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState<{ emotion: string; message: string }[]>([]);

  useEffect(() => {
    const feelingsDB = realm.objects('Feeling');
    // @ts-ignore
    setFeelings(feelingsDB);

    // 업데이트 체크
    feelingsDB.addListener(() => {
      const feelingsDB = realm.objects('Feeling');
      // @ts-ignore
      setFeelings(feelingsDB);
    });
    return () => {
      feelingsDB.removeAllListeners();
    };
  }, []);

  return (
    <View>
      <Title>My journal</Title>
      <FlatList
        data={feelings}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={(feeling, index) => `${index}`}
        renderItem={({ item }) => (
          <Record>
            <Emotion>{item.emotion}</Emotion>
            <Message>{item.message}</Message>
          </Record>
        )}
      />
      <Btn onPress={() => navigate('Write')} style={{ elevation: 5 }}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </View>
  );
};
export default Home;
