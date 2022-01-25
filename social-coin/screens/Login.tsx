import * as React from 'react';
import styled from 'styled-components/native';
import { OutNavStackProps } from '../navigators/OutNav';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text``;
const Btn = styled.TouchableOpacity``;
const BtnText = styled.Text``;

const Login = ({ navigation: { navigate } }: OutNavStackProps<'Login'>) => {
  return (
    <Container>
      <Text>
        Don`t have an account?
        <Btn onPress={() => navigate('Join')}>
          <BtnText>Join</BtnText>
        </Btn>
      </Text>
    </Container>
  );
};

export default Login;
