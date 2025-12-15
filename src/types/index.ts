import { Posting } from "./__generated__/graphql";

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Profile: undefined;
  EventReportsHistory: undefined;
};

export type MainTabParamList = {
  Verification: undefined;
  Team: undefined;
  EventReports: undefined;
};

export interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export interface TeamMemberCardProps {
  member: Posting;
  onVerify: (member: Posting) => void;
  verificationStatus: "pending" | "completed" | "failed";
}
