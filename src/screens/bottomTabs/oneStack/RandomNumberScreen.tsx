import * as React from 'react';
import {StatusBar, Text, View, StyleSheet} from 'react-native';
import {MotiView, MotiText} from 'moti';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {useEffect, useMemo, useRef, useState} from 'react';

const TEXT_SIZE = 60;

const numZeroToNine = [...Array(10).keys()];
// Hook
function usePrevious(value: number) {
  const ref = useRef<number>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Tick = ({num, index}: {num: number; index: number}) => {
  const xxx = usePrevious(num);
  return (
    <MotiView style={{height: TEXT_SIZE, overflow: 'hidden'}}>
      <MotiView
        from={{translateY: -TEXT_SIZE * (xxx ?? 0)}}
        animate={{translateY: -TEXT_SIZE * num}}
        transition={{
          type: 'timing',
          duration: 500,
          delay: 80 * index,
        }}>
        {numZeroToNine.map((number, index) => {
          return (
            <MotiText
              key={index}
              style={[
                {
                  fontWeight: 'bold',
                  color: 'orange',
                  height: TEXT_SIZE,
                  fontSize: TEXT_SIZE,
                  lineHeight: TEXT_SIZE * 1.1,
                  textAlign: 'center',
                },
              ]}>
              {number}
            </MotiText>
          );
        })}
      </MotiView>
    </MotiView>
  );
};

const Ticker = ({number}: {number: number}) => {
  const numArray = useMemo(() => String(number).split(''), [number]);
  return (
    <MotiView style={{flexDirection: 'row'}}>
      {numArray.map((num, index) => (
        <Tick key={index} num={parseFloat(num)} index={index} />
      ))}
    </MotiView>
  );
};

const RandomNumberScreen = () => {
  const [number, setNumber] = useState<number>(Math.floor(Math.random() * 89999) + 10000);

  useEffect(() => {
    const interval = setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 89999) + 10000;
      setNumber(randomNumber);
    }, 2000);

    return () => {
      clearTimeout(interval);
    };
  }, [number]);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Ticker number={number} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: getStatusBarHeight(true),
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RandomNumberScreen;
