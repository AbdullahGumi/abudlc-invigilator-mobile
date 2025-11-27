import { gql } from "@apollo/client";

export const GET_CURRENT_USER_POSTING_ID = gql`
  query GetCurrentUserPostingId {
    getCurrentUserPostingId
  }
`;

export const GET_CURRENT_USER_POSTING_EVENT_REPORTS = gql`
  query GetCurrentUserPostingEventReports {
    getCurrentUserPostingEventReports {
      id
      title
      body
      createdAt
      updatedAt
      posting {
        id
        center {
          id
          name
        }
      }
      reporter {
        id
        fullName
      }
      media {
        id
        uri
        thumbnailUri
      }
    }
  }
`;

export const GET_CURRENT_USER_POSTING_EVENT_REPORT = gql`
  query GetCurrentUserPostingEventReport($id: ID!) {
    getCurrentUserPostingEventReport(id: $id) {
      id
      title
      body
      createdAt
      updatedAt
      posting {
        id
        center {
          id
          name
        }
      }
      reporter {
        id
        fullName
      }
      media {
        id
        uri
        thumbnailUri
      }
    }
  }
`;

export const CREATE_EVENT_REPORT = gql`
  mutation CreateEventReport($input: CreateEventReportInput!) {
    createEventReport(input: $input) {
      success
      message
      item {
        id
        title
        body
        createdAt
        updatedAt
        posting {
          id
          center {
            id
            name
          }
        }
        reporter {
          id
          fullName
        }
        media {
          id
          uri
          thumbnailUri
        }
      }
    }
  }
`;
