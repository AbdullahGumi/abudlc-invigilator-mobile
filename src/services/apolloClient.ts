import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

import { API_CONFIG, STORAGE_KEYS } from "../constants";

const httpLink = createHttpLink({
  uri: API_CONFIG.GRAPHQL_URL,
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        client_id: API_CONFIG.CLIENT_ID,
      },
    };
  } catch (error) {
    console.warn("Error retrieving access token:", error);
    return {
      headers: {
        ...headers,
        client_id: API_CONFIG.CLIENT_ID,
      },
    };
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
