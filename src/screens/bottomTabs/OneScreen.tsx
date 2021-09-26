import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import textStyle from '~/styles/TextStyle';
import {useNavigation} from '@react-navigation/native';
import {RootStackCompositeProp} from '~/navigators/RootStackNavigator';

const OneScreen = () => {
  const oneStackNavigation = useNavigation<RootStackCompositeProp>();

  return (
    <SafeAreaView>
      <Text>OneScreen</Text>
      <TouchableOpacity style={{padding: 8}} onPress={() => oneStackNavigation.navigate('OneStackScreen')}>
        <Text style={textStyle.bold20}>TempScreen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OneScreen;
