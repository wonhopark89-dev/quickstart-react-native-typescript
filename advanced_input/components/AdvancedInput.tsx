import React from 'react';
import {Text, View} from 'react-native';
import {useForm} from 'react-hook-form';

interface InputProps {
  test1: string;
  test2: string;
  test3: number;
}

const AdvancedInput = () => {
  const {} = useForm<InputProps>({
    defaultValues: {
      test1: '',
      test2: '',
      test3: 123,
    },
  });

  return (
    <View>
      <Text>AdvancedInput</Text>
    </View>
  );
};

export default AdvancedInput;
