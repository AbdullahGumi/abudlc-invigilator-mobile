import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "../types";
import LoginScreen from "../screens/auth/LoginScreen";
import VerificationScreen from "../screens/verification/VerificationScreen";
import useAuth from "../hooks/useLoginWithPassword/useAuth";

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
