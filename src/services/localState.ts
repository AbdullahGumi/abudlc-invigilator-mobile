import { LocalState } from "@apollo/client/local-state";
import { STORAGE_KEYS } from "../constants";
import * as SecureStore from "expo-secure-store";
import {} from "../types/__generated__/graphql";

export const localState = new LocalState({
  resolvers: {
    Mutation: {
      setAuth: async (_, { accessToken, refreshToken }) => {
        await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        await SecureStore.setItemAsync(
          STORAGE_KEYS.REFRESH_TOKEN,
          refreshToken,
        );

        return {
          accessToken,
          refreshToken,
        };
      },
    },
  },
});
