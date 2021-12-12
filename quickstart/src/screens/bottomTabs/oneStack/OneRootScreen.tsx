import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import textStyle from '~/styles/TextStyle';
import {OneStackNavigationProps} from '~/navigators/OneStackNavigator';

const testString = '123456790_ABCDE_abcde_안녕하세요';

const OneRootScreen = ({navigation: {navigate}}: OneStackNavigationProps<'OneRootScreen'>) => {
  return (
    <SafeAreaView>
      <Text style={textStyle.bold20}>{testString}</Text>
      <Text style={textStyle.bold16}>{testString}</Text>
      <Text style={textStyle.regular20}>{testString}</Text>
      <Text style={textStyle.regular16}>{testString}</Text>
      <TouchableOpacity onPress={() => navigate('RandomNumberScreen')}>
        <Text style={textStyle.bold16}>{'랜덤넘버'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OneRootScreen;
