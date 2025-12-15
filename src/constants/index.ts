const baseUrl = "https://cbt-backend.deterrence.ng";

// API Configuration
export const CONFIG = {
  GRAPHQL_URL: `${baseUrl}/graphql`,
  REST_API_URL: `${baseUrl}/v1`,
  APP_ENV: "development",
  CLIENT_ID: "cmetwk06k0001pdcc86avwful",
  PRIVACY_POLICY_URL: "https://abudlc.deterrence.ng/privacy",
};

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
};

// Snackbar Colors
export const SNACKBAR_COLORS = {
  SUCCESS: {
    background: "#E8F5E9",
    text: "#009000",
  },
  ERROR: {
    background: "#FFEBEE",
    text: "#b22222",
  },
};
