import React, {useEffect} from 'react';

import {
  BlurMask,
  Canvas,
  RoundedRect,
  SweepGradient,
  useSharedValueEffect,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import {useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

type BackgroundGradientProps = {
  width: number;
  height: number;
};

const BackgroundGradient: React.FC<BackgroundGradientProps> = React.memo(({width, height}) => {
  const canvasPadding = 40;
  const rValue = useSharedValue(0);
  const skValue = useValue(0); // skia

  useEffect(() => {
    rValue.value = withRepeat(withTiming(10, {duration: 2000}), -1, true);
  }, [rValue]);

  useSharedValueEffect(() => {
    skValue.current = rValue.value;
  }, rValue);

  return (
    <Canvas style={{width: width + canvasPadding, height: height + canvasPadding}}>
      <RoundedRect x={canvasPadding / 2} y={canvasPadding / 2} width={width} height={height} color={'white'} r={20}>
        <SweepGradient
          c={vec((width + canvasPadding) / 2, (height + canvasPadding) / 2)}
          colors={[
            'red',
            'orange',
            'yellow',
            'lightgreen',
            'lightblue',
            'navy',
            'purple',
            'pink',
            'red', // 자연스러움 ( 시작과 동일한 색상 )
          ]}
        />
        <BlurMask blur={skValue} style={'solid'} />
      </RoundedRect>
    </Canvas>
  );
});

export {BackgroundGradient};
