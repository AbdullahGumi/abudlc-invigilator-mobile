import { ApolloClient } from "@apollo/client";
import { localState } from "./localState";

import { API_CONFIG } from "../constants";
import { cache } from "./cache";
import { ApolloLink } from "@apollo/client";
import { AUTH_STATE } from "../hooks/useAuth/query";
import { HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: API_CONFIG.GRAPHQL_URL,
  headers: {
    client_id: API_CONFIG.CLIENT_ID,
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const auth = cache.readQuery({ query: AUTH_STATE });
    if (auth?.auth?.accessToken) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${auth.auth.accessToken}`,
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
  localState,
});
