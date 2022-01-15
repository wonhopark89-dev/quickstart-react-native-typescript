import React, { useState } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import colors from '../color';

const Container = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
  padding: 10px 30px;
`;

const Title = styled.Text`
  color: ${colors.textColor};
  margin: 40px 0;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;
const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 20px;
  background-color: ${colors.btnColor};
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
`;

const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Emotion = styled.TouchableOpacity<{ selected: boolean }>`
  width: 50px;
  height: 50px;
  background-color: white;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
  margin: 0 2px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props) => (props.selected ? 'rgba(41, 30, 95, 1);' : 'transparent')};
`;
const EmotionText = styled.Text`
  font-size: 25px;
`;

const emotions: string[] = ['🤯', '🥲', '🤬', '🤗', '🥰', '😊', '🤩'];

const Write = () => {
  const [selectedEmotion, setEmotion] = useState<string | null>(null);
  const [feelings, setFeelings] = useState<string>('');
  const onChangeText = (text: string) => setFeelings(text);
  const onEmotionPress = (face: string) => setEmotion(face);
  const onSubmit = () => {
    if (feelings === '' || selectedEmotion == null) {
      return Alert.alert('Please complete form.');
    }
  };
  return (
    <Container>
      <Title>How do you feel now?</Title>

      <View style={{ height: 60, marginBottom: 10 }}>
        <ScrollView horizontal={true} bounces={false}>
          {emotions.map((emotion, index) => (
            <Emotion selected={emotion === selectedEmotion} onPress={() => onEmotionPress(emotion)} key={index}>
              <EmotionText>{emotion}</EmotionText>
            </Emotion>
          ))}
        </ScrollView>
      </View>

      <TextInput
        returnKeyType="done"
        // returnKeyLabel={"done"} // android
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder="Write your feelings..."
      />
      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </Container>
  );
};
export default Write;
