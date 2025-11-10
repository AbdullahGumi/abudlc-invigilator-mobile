import { useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { AUTH_STATE } from "./query";

export default function useAuth() {
  const { data } = useQuery(AUTH_STATE);

  const setAuthState = useCallback(
    ({
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    }) => {
      console.log("setAuthState", accessToken, refreshToken);
    },
    [],
  );

  return {
    isLoggedIn: !!data?.auth,
    setAuthState,
  };
}
