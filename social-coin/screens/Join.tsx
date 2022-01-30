import * as React from 'react';
import styled from 'styled-components/native';
import { useRef, useState } from 'react';
import { BLACK_COLOR } from '../colors';
import { ActivityIndicator, Alert, StyleSheet, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
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
    borderWidth: 1,
    backgroundColor: 'grey',
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
  const [loading, setLoading] = useState<boolean>(false);

  const passwordInputRef = useRef<TextInput>(null);

  const onSubmitEmailEditing = () => {
    passwordInputRef.current?.focus();
  };

  const onSubmitPasswordEditing = async () => {
    if (email === '' || password === '') {
      return Alert.alert('Fill in the form.');
    }
    // 버튼 상태값으로 컨트롤 해도 될듯
    // if(loading) {
    //   return
    // }
    setLoading(true);
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
      console.log(JSON.stringify(result));
    } catch (e) {
      // @error auth/email-already-in-use
      // @error auth/invalid-email
      // @error auth/weak-password

      // @ts-ignore
      switch (e.code) {
        case 'auth/weak-password': {
          Alert.alert('Write a stronger password!');
        }
      }
    } finally {
      setLoading(false);
    }
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
        onSubmitEditing={onSubmitEmailEditing}
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
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn disabled={loading} onPress={onSubmitPasswordEditing}>
        {loading ? <ActivityIndicator size={'small'} color={'white'} /> : <BtnText>Create Account</BtnText>}
      </Btn>
    </Container>
  );
};

export default Join;
