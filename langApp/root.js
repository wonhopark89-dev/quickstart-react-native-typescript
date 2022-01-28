import React from "react";
import App from "./App";
import DragAndDrop from "./DragAndDrop";
import Discover from "./CoinDrop";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={client}>
      <Discover />
    </QueryClientProvider>
  );
};

export default Root;
