import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import textStyle from '~/styles/TextStyle';

const testString = '123456790_ABCDE_abcde_안녕하세요';

const RootScreen = () => {
  return (
    <SafeAreaView>
      <Text style={textStyle.bold20}>{testString}</Text>
      <Text style={textStyle.bold16}>{testString}</Text>
      <Text style={textStyle.regular20}>{testString}</Text>
      <Text style={textStyle.regular16}>{testString}</Text>
    </SafeAreaView>
  );
};

export default RootScreen;
