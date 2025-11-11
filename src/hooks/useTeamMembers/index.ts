import { useQuery } from "@apollo/client/react";
import { GET_CURRENT_USER_POSTING_TEAM } from "./query";
import type { GetCurrentUserPostingTeamQuery } from "../../types/__generated__/graphql";

export function useTeamMembers() {
  const { loading, error, data, refetch } =
    useQuery<GetCurrentUserPostingTeamQuery>(GET_CURRENT_USER_POSTING_TEAM);

  return {
    data: data?.getCurrentUserPostingTeam ?? [],
    loading,
    error,
    refetch,
  };
}
