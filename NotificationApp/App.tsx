import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {fcmService} from './src/push/FCMService';
import {localNotificationService} from './src/push/LocalNotificationService';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [tk, setTk] = useState<string>('');
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    // @ts-ignore
    function onRegister(token) {
      console.log('[App] onRegister : token :', token);
      setTk(token);
    }

    // @ts-ignore
    function onNotification(notify) {
      console.log('[App] onNotification : notify :', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    // @ts-ignore
    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification : notify :', notify);
      Alert.alert('Open Notification : notify.body :' + notify.body);
    }
    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unRegister();
    };
  }, []);

  // 구독하기
  const callApiSubscribeTopic = (topic: string = 'Topic1') => {
    //   return instance.post('/push');
    return messaging()
      .subscribeToTopic(topic)
      .then(() => Alert.alert(`${topic} 구독 성공!!`))
      .catch(() => Alert.alert(`${topic} 구독 실패!!`));
  };

  const callApiUnsubscribeTopic = (topic: string = 'Topic1') => {
    //   return instance.post('/push');
    return messaging()
      .unsubscribeFromTopic(topic)
      .then(() => Alert.alert(`${topic} 해제 성공!!`))
      .catch(() => Alert.alert(`${topic} 해제 실패!!`));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <Text style={{color: 'white'}}>Push 테스트</Text>
      <Text style={{fontSize: 20, color: 'white'}}>{tk}</Text>
      <TouchableOpacity
        onPress={() => callApiSubscribeTopic()}
        style={{
          padding: 10,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'cyan',
          borderRadius: 5,
        }}>
        <Text style={{color: 'white'}}>{`Topic1 구독하기`}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => callApiUnsubscribeTopic()}
        style={{
          padding: 10,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'cyan',
          borderRadius: 5,
        }}>
        <Text style={{color: 'white'}}>{`Topic1 구독해제`}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
