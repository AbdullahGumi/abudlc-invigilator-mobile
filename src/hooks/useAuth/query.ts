import { gql, TypedDocumentNode } from "@apollo/client";
import {
  AuthStateQuery,
  AuthStateQueryVariables,
} from "../../types/__generated__/graphql";

export const AUTH_STATE: TypedDocumentNode<
  AuthStateQuery,
  AuthStateQueryVariables
> = gql`
  query AuthState @client {
    auth {
      accessToken
      refreshToken
    }
  }
`;

export const SET_AUTH = gql`
  mutation SetAuth($accessToken: String!, $refreshToken: String!) @client {
    setAuth(accessToken: $accessToken, refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;
