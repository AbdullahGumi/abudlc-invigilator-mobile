import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "../types";
import LoginScreen from "../screens/auth/LoginScreen";
import VerificationScreen from "../screens/verification/VerificationScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
