import { useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { AUTH_STATE } from "./query";

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
      client.writeQuery({
        query: AUTH_STATE,
        data: { auth: { __typename: "AuthState", accessToken, refreshToken } },
      });
    },
    [client],
  );

  return {
    isLoggedIn: !!data?.auth,
    setAuthState,
  };
}
