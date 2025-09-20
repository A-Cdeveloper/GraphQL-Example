import "bulma/css/bulma.css";

import { ApolloProvider } from "@apollo/client/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { apolloClient as client } from "./lib/graphql/client";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
