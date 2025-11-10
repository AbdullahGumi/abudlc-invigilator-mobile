import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client";

import { lightTheme } from "./src/constants/theme";
import { AuthProvider } from "./src/contexts/AuthContext";
import { client } from "./src/services/apolloClient";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <ApolloProvider client={client}>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </ApolloProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
