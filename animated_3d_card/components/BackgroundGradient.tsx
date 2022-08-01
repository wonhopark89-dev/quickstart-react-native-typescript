import React from 'react';
import {StyleSheet, View} from 'react-native';

type BackgroundGradientProps = {
  width: number;
  height: number;
};

const BackgroundGradient: React.FC<BackgroundGradientProps> = React.memo(() => {
  return <View style={styles.container} />;
});

const styles = StyleSheet.create({
  container: {},
});

export {BackgroundGradient};
