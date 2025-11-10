import { gql, TypedDocumentNode } from "@apollo/client";
import {
  LoginWithPasswordMutation,
  LoginWithPasswordMutationVariables,
  GetUserSessionQuery,
  GetUserSessionQueryVariables,
} from "../../types/__generated__/graphql";

export const LOGIN_WITH_PASSWORD: TypedDocumentNode<
  LoginWithPasswordMutation,
  LoginWithPasswordMutationVariables
> = gql`
  mutation LoginWithPassword($input: LoginWithPasswordInput!) {
    loginWithPassword(input: $input) {
      success
      message
      accessToken
      refreshToken
      user {
        id
        firstName
        lastName
        fullName
        username
        staffId
        email
        isAdmin
        phoneNumber
        picture {
          id
          thumbnailUri
          uri
        }
        userRole {
          id
          role {
            id
            name
            displayName
            description
          }
        }
        rank {
          id
          name
          description
        }
      }
    }
  }
`;

// Get current user session
export const GET_USER_SESSION: TypedDocumentNode<
  GetUserSessionQuery,
  GetUserSessionQueryVariables
> = gql`
  query GetUserSession {
    me {
      id
      firstName
      lastName
      fullName
      username
      staffId
      email
      isAdmin
      phoneNumber
      picture {
        id
        thumbnailUri
        uri
      }
      userRole {
        id
        role {
          id
          name
          displayName
          description
        }
      }
      rank {
        id
        name
        description
      }
    }
  }
`;
