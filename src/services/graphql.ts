import { gql } from "@apollo/client";

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
