import { useCallback } from "react";

export default function useAuth() {
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
    isLoggedIn: false,
    setAuthState,
  };
}
