import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "../types";
import LoginScreen from "../screens/auth/LoginScreen";
import MainTabNavigator from "./MainTabNavigator";
import ProfileScreen from "../screens/profile/ProfileScreen";
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
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
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
