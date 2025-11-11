import { useQuery } from "@apollo/client/react";
import { GET_USER_SESSION } from "../useLoginWithPassword/mutation";

export default function useCurrentUser() {
  const { data, loading, error } = useQuery(GET_USER_SESSION);

  return {
    user: data?.me,
    loading,
    error,
  };
}
