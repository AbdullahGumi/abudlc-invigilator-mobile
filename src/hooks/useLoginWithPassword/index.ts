import { useMutation } from "@apollo/client/react";
import { useCallback } from "react";

import { GET_USER_SESSION, LOGIN_WITH_PASSWORD } from "./mutation";
import { IdentityType, PasswordType } from "../../types/__generated__/graphql";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function useLoginWithPassword() {
  const [mutate, { loading, data, error, reset }] = useMutation(
    LOGIN_WITH_PASSWORD,
    {
      onError(error) {
        console.log("Login error:", error.message);
      },
      onCompleted(data) {
        if (data.loginWithPassword.message) {
          console.log("Login success:", data.loginWithPassword.message);
        }
      },
    },
  );

  const login = useCallback(async (values: LoginFormData) => {
    console.log("login", values);
    const { data } = await mutate({
      variables: {
        input: {
          identityType: IdentityType.Email,
          passwordType: PasswordType.Database,
          identity: values.email,
          password: values.password,
        },
      },
      update(cache, { data }) {
        if (data?.loginWithPassword.user) {
          const { user } = data.loginWithPassword;

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
    error,
    onReset: reset,
  };
}
