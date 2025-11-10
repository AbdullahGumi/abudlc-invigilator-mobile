import { ApolloClient, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

import { API_CONFIG, STORAGE_KEYS } from "../constants";
import { cache } from "./cache";

const httpLink = createHttpLink({
  uri: API_CONFIG.GRAPHQL_URL,
  headers: {
    client_id: API_CONFIG.CLIENT_ID,
  },
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
