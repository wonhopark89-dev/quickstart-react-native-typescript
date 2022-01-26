import * as React from 'react';
import styled from 'styled-components/native';
import { useRef, useState } from 'react';
import { BLACK_COLOR } from '../colors';
import { StyleSheet, TextInput } from 'react-native';

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;
// const TextInput = styled.TextInput`
//   width: 100%;
//   padding: 10px 20px;
//   border-radius: 20px;
//   margin-bottom: 10px;
//   font-size: 16px;
//   color: white;
//   background-color: rgba(255, 255, 255, 0.5);
// `;
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    fontSize: 16,
    color: 'white',
  },
});

const Join = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const passwordInputRef = useRef<TextInput>(null);

  const onSubmitEditing = () => {
    passwordInputRef.current?.focus();
  };
  return (
    <Container>
      <TextInput
        style={styles.textInput}
        placeholder={'Email'}
        keyboardType={'email-address'}
        autoCapitalize={'none'}
        autoCorrect={false}
        value={email}
        returnKeyType={'next'}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
        onSubmitEditing={onSubmitEditing}
      />
      <TextInput
        ref={passwordInputRef}
        style={styles.textInput}
        placeholder={'Password'}
        secureTextEntry={true}
        autoCapitalize={'none'}
        autoCorrect={false}
        value={password}
        returnKeyType={'done'}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
      />
      <Btn>
        <BtnText>Create Account</BtnText>
      </Btn>
    </Container>
  );
};

export default Join;
