import React from 'react';
import {StyleSheet} from 'react-native';
import palette from '~/styles/ColorStyle';

/**
 * fontFamily
 * ios : PostScript Name
 * android : File Name
 */

const textStyle = StyleSheet.create({
  bold20: {
    includeFontPadding: false,
    fontSize: 20,
    fontFamily: 'EliceDigitalBaeumOTF-Bd',
    color: palette.primary,
  },
  bold16: {
    includeFontPadding: false,
    fontSize: 16,
    fontFamily: 'EliceDigitalBaeumOTF-Bd',
    color: palette.primary,
  },
  regular20: {
    includeFontPadding: false,
    fontSize: 20,
    fontFamily: 'EliceDigitalBaeumOTF',
    color: palette.primary,
  },
  regular16: {
    includeFontPadding: false,
    fontSize: 16,
    fontFamily: 'EliceDigitalBaeumOTF',
    color: palette.primary,
  },
});

export default textStyle;
