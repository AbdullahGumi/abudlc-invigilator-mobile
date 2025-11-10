import { useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { STORAGE_KEYS } from "../../constants";
import { makeVar } from "@apollo/client";
import { useReactiveVar } from "@apollo/client/react";

const tokenVar = makeVar(SecureStore.getItem(STORAGE_KEYS.ACCESS_TOKEN));

export default function useAuth() {
  const isLoggedIn = useReactiveVar(tokenVar);

  const setAuthState = useCallback(
    async ({
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    }) => {
      await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      tokenVar(accessToken);
    },
    [],
  );

  const clearAuthState = useCallback(async () => {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    tokenVar(null);
  }, []);

  return {
    isLoggedIn,
    setAuthState,
    clearAuthState,
  };
}
