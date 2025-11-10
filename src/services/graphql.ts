import { gql } from "@apollo/client";

// Login mutation
export const LOGIN_WITH_PASSWORD = gql`
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
export const GET_USER_SESSION = gql`
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

export const GET_CURRENT_USER_POSTING_TEAM = gql`
  query GetCurrentUserPostingTeam {
    getCurrentUserPostingTeam {
      id
      user {
        id
        fullName
        staffId
        picture {
          id
          thumbnailUri
          uri
        }
      }
      attendance {
        id
        createdAt
        picture {
          id
          uri
          thumbnailUri
        }
      }
    }
  }
`;
