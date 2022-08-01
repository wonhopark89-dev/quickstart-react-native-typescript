import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BlurMask,
  Canvas,
  RoundedRect,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';

type BackgroundGradientProps = {
  width: number;
  height: number;
};

const BackgroundGradient: React.FC<BackgroundGradientProps> = React.memo(
  ({width, height}) => {
    const canvasPadding = 40;

    return (
      <Canvas
        style={{width: width + canvasPadding, height: height + canvasPadding}}>
        <RoundedRect
          x={canvasPadding / 2}
          y={canvasPadding / 2}
          width={width}
          height={height}
          color={'white'}
          r={20}>
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
          <BlurMask blur={10} style={'solid'} />
        </RoundedRect>
      </Canvas>
    );
  },
);

export {BackgroundGradient};
