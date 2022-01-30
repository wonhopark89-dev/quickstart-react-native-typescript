import React from "react";
import App from "./App";
import DragAndDrop from "./DragAndDrop";
import Discover from "./CoinDrop";
import { QueryClient, QueryClientProvider } from "react-query";
import DragAndDrop2 from "./DragAndDrop2";

const client = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={client}>
      <DragAndDrop2 />
    </QueryClientProvider>
  );
};

export default Root;
