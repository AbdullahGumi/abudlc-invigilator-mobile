import { gql, TypedDocumentNode } from "@apollo/client";
import {
  GetCurrentUserPostingTeamQuery,
  GetCurrentUserPostingTeamQueryVariables,
} from "../../types/__generated__/graphql";

export const GET_CURRENT_USER_POSTING_TEAM: TypedDocumentNode<
  GetCurrentUserPostingTeamQuery,
  GetCurrentUserPostingTeamQueryVariables
> = gql`
  query GetCurrentUserPostingTeam {
    getCurrentUserPostingTeam {
      id
      user {
        id
        fullName
        staffId
        userRole {
          id
          role {
            id
            displayName
          }
        }
        status {
          id
          name
        }
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
