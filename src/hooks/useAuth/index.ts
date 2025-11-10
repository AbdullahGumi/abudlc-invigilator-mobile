import { useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { AUTH_STATE, SET_AUTH } from "./query";

export default function useAuth() {
  const { data, client } = useQuery(AUTH_STATE);

  const setAuthState = useCallback(
    async ({
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    }) => {
      await client.mutate({
        mutation: SET_AUTH,
        variables: { accessToken, refreshToken },
      });
    },
    [],
  );

  return {
    isLoggedIn: !!data?.auth,
    setAuthState,
  };
}
