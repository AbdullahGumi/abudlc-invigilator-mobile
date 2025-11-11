import { Posting } from "./__generated__/graphql";

export type RootStackParamList = {
  Login: undefined;
  Verification: undefined;
  Profile: undefined;
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
