import { ApolloClient } from "@apollo/client";

import { CONFIG } from "../constants";
import { cache } from "./cache";
import { ApolloLink } from "@apollo/client";
import { AUTH_STATE } from "../hooks/useAuth/query";
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
    const auth = operation.client.readQuery({ query: AUTH_STATE });

    if (auth?.auth?.accessToken) {
      return {
        headers: {
          ...headers,
          authorization: auth.auth.accessToken
            ? `Bearer ${auth.auth.accessToken}`
            : undefined,
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
