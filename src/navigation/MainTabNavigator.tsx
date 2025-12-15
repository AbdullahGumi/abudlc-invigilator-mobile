import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { MainTabParamList } from "../types";
import VerificationScreen from "../screens/verification/VerificationScreen";
import TeamScreen from "../screens/team/TeamScreen";
import EventReportsScreen from "../screens/eventReports/EventReportsScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Verification") {
            iconName = focused
              ? "checkmark-circle"
              : "checkmark-circle-outline";
          } else if (route.name === "Team") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "EventReports") {
            iconName = focused ? "document-text" : "document-text-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#237c08ff",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Verification"
        component={VerificationScreen}
        options={{
          tabBarLabel: "Verifications",
        }}
      />
      <Tab.Screen
        name="Team"
        component={TeamScreen}
        options={{
          tabBarLabel: "Attendance",
        }}
      />
      <Tab.Screen
        name="EventReports"
        component={EventReportsScreen}
        options={{
          tabBarLabel: "Report",
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
