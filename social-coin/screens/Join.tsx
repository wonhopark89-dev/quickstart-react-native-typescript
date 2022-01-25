import * as React from 'react';
import styled from 'styled-components/native';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text``;

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
        placeholder={'Email'}
        keyboardType={'email-address'}
        autoCapitalize={'none'}
        autoCorrect={false}
        value={email}
        returnKeyType={'next'}
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={() => {}}
      />
      <TextInput
        ref={passwordInputRef}
        placeholder={'Password'}
        secureTextEntry={true}
        autoCapitalize={'none'}
        autoCorrect={false}
        value={password}
        returnKeyType={'done'}
        onChangeText={(text) => setPassword(text)}
      />
    </Container>
  );
};

export default Join;
