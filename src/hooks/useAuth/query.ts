import { gql, TypedDocumentNode } from "@apollo/client";
import {
  AuthStateQuery,
  AuthStateQueryVariables,
} from "../../types/__generated__/graphql";

export const AUTH_STATE: TypedDocumentNode<
  AuthStateQuery,
  AuthStateQueryVariables
> = gql`
  query AuthState {
    auth {
      accessToken
      refreshToken
    }
  }
`;
