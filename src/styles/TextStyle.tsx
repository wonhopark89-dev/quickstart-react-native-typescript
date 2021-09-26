import React from 'react';
import {StyleSheet} from 'react-native';

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
  },
  bold16: {
    includeFontPadding: false,
    fontSize: 16,
    fontFamily: 'EliceDigitalBaeumOTF-Bd',
  },
  regular20: {
    includeFontPadding: false,
    fontSize: 20,
    fontFamily: 'EliceDigitalBaeumOTF',
  },
  regular16: {
    includeFontPadding: false,
    fontSize: 16,
    fontFamily: 'EliceDigitalBaeumOTF',
  },
});

export default textStyle;
