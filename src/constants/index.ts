// API Configuration
export const API_CONFIG = {
  GRAPHQL_URL:
    process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.100:4000/graphql",
  REST_API_URL:
    process.env.EXPO_PUBLIC_REST_API_URL || "http://192.168.1.100:4000",
  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV || "development",
  CLIENT_ID: process.env.EXPO_PUBLIC_CLIENT_ID || "cmhs47ial00010fakyt13f08k",
};

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER_DATA: "userData",
};
