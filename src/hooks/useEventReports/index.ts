import { useState, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import * as SecureStore from "expo-secure-store";
import { CONFIG, STORAGE_KEYS } from "../../constants";
import {
  GET_CURRENT_USER_POSTING_ID,
  CREATE_EVENT_REPORT,
  GET_CURRENT_USER_POSTING_EVENT_REPORTS,
} from "./queries";

type PostingIdData = {
  getCurrentUserPostingId: string | null;
};

type ReportsData = {
  getCurrentUserPostingEventReports: Array<EventReport>;
};

type CreateEventReportVariables = {
  input: CreateEventReportInput;
};

type CreateEventReportData = {
  createEventReport: EventReportResponse;
};

export interface CreateEventReportInput {
  postingId: string;
  title: string;
  body: string;
}

export interface EventReport {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt?: string;
  posting: {
    id: string;
    center: {
      id: string;
      name: string;
    };
  };
  reporter: {
    id: string;
    fullName?: string;
  };
  media: Array<{
    id: string;
    uri: string;
    thumbnailUri: string;
  }>;
}

export interface EventReportResponse {
  success?: boolean;
  message?: string;
  item?: EventReport;
}

export default function useEventReports() {
  const [isLoading, setIsLoading] = useState(false);

  const { data: postingIdData, loading: postingIdLoading } =
    useQuery<PostingIdData>(GET_CURRENT_USER_POSTING_ID);

  const [createEventReportMutation] = useMutation<
    CreateEventReportData,
    CreateEventReportVariables
  >(CREATE_EVENT_REPORT);
  const { data: reportsData, refetch: refetchReports } = useQuery<ReportsData>(
    GET_CURRENT_USER_POSTING_EVENT_REPORTS,
    {
      fetchPolicy: "cache-and-network",
    },
  );

  const getPostingId = useCallback(async (): Promise<string | null> => {
    try {
      if (postingIdData?.getCurrentUserPostingId) {
        return postingIdData.getCurrentUserPostingId;
      }
      return null;
    } catch (error) {
      console.error("Error getting posting ID:", error);
      return null;
    }
  }, [postingIdData]);

  const createEventReport = useCallback(
    async (
      input: CreateEventReportInput,
    ): Promise<EventReportResponse | null> => {
      setIsLoading(true);
      try {
        const { data } = await createEventReportMutation({
          variables: { input },
        });

        if (data?.createEventReport?.success) {
          // Refetch reports to update the list
          refetchReports();
        }

        return data?.createEventReport || null;
      } catch (error) {
        console.error("Error creating event report:", error);
        return {
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [createEventReportMutation, refetchReports],
  );

  const uploadImages = useCallback(
    async (
      eventReportId: string,
      images: Array<{ uri: string; type: string; name: string }>,
    ): Promise<boolean> => {
      setIsLoading(true);
      try {
        const token = await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
        if (!token) {
          throw new Error("No access token available");
        }

        for (const image of images) {
          const formData = new FormData();
          formData.append("media", {
            uri: image.uri,
            type: image.type,
            name: image.name,
          } as unknown as Blob);

          const response = await fetch(
            `${CONFIG.REST_API_URL}/posting/event-reports/${eventReportId}/media`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                client_id: CONFIG.CLIENT_ID,
              },
              body: formData,
            },
          );

          if (!response.ok) {
            throw new Error(`Failed to upload image: ${response.statusText}`);
          }
        }

        refetchReports();
        return true;
      } catch (error) {
        console.error("Error uploading images:", error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [refetchReports],
  );

  const getReports = useCallback(() => {
    return reportsData?.getCurrentUserPostingEventReports || [];
  }, [reportsData]);

  return {
    getPostingId,
    createEventReport,
    uploadImages,
    getReports,
    refetchReports,
    isLoading: isLoading || postingIdLoading,
  };
}
