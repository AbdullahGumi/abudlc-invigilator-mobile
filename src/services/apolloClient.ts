import { ApolloClient } from "@apollo/client";

import { CONFIG, STORAGE_KEYS } from "../constants";
import { cache } from "./cache";
import { ApolloLink } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { HttpLink } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

if (CONFIG.APP_ENV === "development") {
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = new HttpLink({
  uri: CONFIG.GRAPHQL_URL,
  headers: {
    client_id: CONFIG.CLIENT_ID,
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const accessToken = SecureStore.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (accessToken) {
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      };
    }
    return { headers };
  });
  return forward(operation);
});

export const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache,
});
