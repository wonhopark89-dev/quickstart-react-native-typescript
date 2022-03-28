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
- 네비게이션 이동 후, 상태바꾸는 건 지양할 것 ( navigate(=unmount) 된 후 상태 변경 하지 말 것)

### naver-map
- yarn add react-native-nmap --force


### xcode 클린빌드 ( 정말 안될떄 )
```
cd ios && pod deintegrate
rm -rf Podfile.lock
-> xcode clean ( cmd + shift + k )
pod install
-> xcode build
```

### permission
- Permission-LocationAccuracy
  ( 위치 정확도는 높아지지만 배터리소모가 커질 수 있음 )

### FCM
#### 안드로이드
```
- 파이어베이스 프로젝트 생성
- google-services.json 설정 및 gradle 설정
( app, build gradle 설정 각각 가이드대로 ) 
- 프로젝트 설정 -> 서비스계정 ->  새 비공개 키 설정(서버에서 필요함)
- 아래값 true 설정 
<meta-data  android:name="com.dieam.reactnativepushnotification.notification_foreground"
                  android:value="true"/>
```

#### iOS
```
- ios 프로젝트에 GoogleService-Info.plist 복사 붙여넣기가 아닌 새파일로 추가하기로 해야한다.
```
- [참고(react-native-push-notification)](https://github.com/zo0r/react-native-push-notification)


#### iOS
- p8 인증서를 파이어베이스 등록해야함
