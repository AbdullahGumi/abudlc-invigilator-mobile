import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client/react";

import { lightTheme } from "./src/constants/theme";
import { client } from "./src/services/apolloClient";
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ApolloProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
