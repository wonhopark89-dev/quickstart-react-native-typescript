import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import InNavStackNavigator from './navigators/InNav';
import OutNavStackNavigator from './navigators/OutNav';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // console.log(auth().currentUser);
    // 유저의 인증상태를 감시
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{isLoggedIn ? <InNavStackNavigator /> : <OutNavStackNavigator />}</NavigationContainer>
    </QueryClientProvider>
  );
}
