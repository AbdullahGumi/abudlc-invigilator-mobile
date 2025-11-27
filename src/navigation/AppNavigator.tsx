import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "../types";
import LoginScreen from "../screens/auth/LoginScreen";
import VerificationScreen from "../screens/verification/VerificationScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import TeamScreen from "../screens/team/TeamScreen";
import EventReportsScreen from "../screens/eventReports/EventReportsScreen";
import EventReportsHistoryScreen from "../screens/eventReports/EventReportsHistoryScreen";
import useAuth from "../hooks/useAuth";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#ffffff" },
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Team" component={TeamScreen} />
          <Stack.Screen name="EventReports" component={EventReportsScreen} />
          <Stack.Screen
            name="EventReportsHistory"
            component={EventReportsHistoryScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
