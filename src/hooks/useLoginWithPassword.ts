import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { useCallback } from "react";

import { STORAGE_KEYS } from "../constants";
import { LOGIN_WITH_PASSWORD, GET_USER_SESSION } from "../services/graphql";
import { LoginFormData } from "../types";

export default function useLoginWithPassword() {
  const [mutate, { loading, data }] = useMutation(LOGIN_WITH_PASSWORD, {
    onError(error) {
      console.error("Login error:", error);
    },
    onCompleted(data) {
      if (data.loginWithPassword.message) {
        console.log("Login success:", data.loginWithPassword.message);
      }
    },
  });

  const login = useCallback(async (values: LoginFormData) => {
    const { data } = await mutate({
      variables: {
        input: {
          identityType: "EMAIL",
          passwordType: "DATABASE",
          identity: values.email,
          password: values.password,
        },
      },
      update(cache, { data }) {
        if (data?.loginWithPassword.user) {
          const { user, accessToken } = data.loginWithPassword;

          if (accessToken) {
            SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
          }

          cache.writeQuery({
            query: GET_USER_SESSION,
            data: {
              me: user,
            },
          });
        }
      },
    });

    return data?.loginWithPassword;
  }, []);

  return {
    data: data?.loginWithPassword,
    login,
    loading,
  };
}
