- TextInput, StyleSheet.compose 사용
- DismissKeyboardView 만들기(Keyboard, KeyboardAvoidingView)
- KeyboardAvoidingView는 불편함
- react-native-keyboard-aware-scrollview를 대안으로 사용
- TouchableWithoutFeedback 타입은 버튼임
- useSelector 는 provider 안쪽에서만 사용가능
- react-native-config 값 확인 (Android 는 generated/BuildConfig)  
- .env / .env.development 로 구별해도 되고, .env 하나를 코드 내 \__DEV\__ 혹은  
  process.env.NODE_ENV == 'production' 로 구별해도됨
---
### redux
- action : state 를 바꾸는 행위/동작
- dispatch : 그 액션을 실제로 실행하는 함수
- reducer : 액션이 실제로 실행되면 state 를 바꾸는 로직

### axios
- interceptors 기능 활용하기 ( 요청/응답 전후 )
- authorization 첫 글자는 한 가지로 통일하기 ( 대문자면 다 대문자, 소문자면 다 소문자 )
