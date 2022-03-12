import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const DismissKeyboardView: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ children, ...props }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView {...props} style={props.style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

/**
 *  behavior
 *  - position : 안드로이드
 *  - padding : 아이폰
 */
// const DismissKeyboardView: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ children, ...props }) => (
//   <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//     <KeyboardAvoidingView
//       {...props}
//       style={[props.style, Platform.OS === 'ios' && { flex: 1 }]}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
//       {children}
//     </KeyboardAvoidingView>
//   </TouchableWithoutFeedback>
// );

export default DismissKeyboardView;
