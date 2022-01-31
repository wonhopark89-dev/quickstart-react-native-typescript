import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import RootNavigator from "./src/navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
