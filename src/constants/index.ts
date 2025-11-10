const baseUrl = "http://192.168.0.166:8082";

// API Configuration
export const API_CONFIG = {
  GRAPHQL_URL: `${baseUrl}/graphql`,
  REST_API_URL: `${baseUrl}/v1`,
  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV || "development",
  CLIENT_ID: process.env.EXPO_PUBLIC_CLIENT_ID || "cmetwfh3v00018oj12woe6gpc",
};

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
};
