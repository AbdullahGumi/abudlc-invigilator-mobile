import { InMemoryCache } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { STORAGE_KEYS } from "../constants";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        auth: {
          async read() {
            return {
              accessToken: await SecureStore.getItemAsync(
                STORAGE_KEYS.ACCESS_TOKEN,
              ),
              refreshToken: await SecureStore.getItemAsync(
                STORAGE_KEYS.REFRESH_TOKEN,
              ),
            };
          },
          async merge(_, value) {
            await SecureStore.setItemAsync(
              STORAGE_KEYS.ACCESS_TOKEN,
              value.accessToken,
            );
            await SecureStore.setItemAsync(
              STORAGE_KEYS.REFRESH_TOKEN,
              value.refreshToken,
            );
            return value;
          },
        },
      },
    },
  },
});
