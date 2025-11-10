import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Snackbar,
  HelperText,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";

import Logo from "../../components/Logo";
import { useAuth } from "../../contexts/AuthContext";
import { LoginFormData } from "../../types";
import { VALIDATION_RULES } from "../../constants";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(VALIDATION_RULES.EMAIL_REGEX, "Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const LoginScreen: React.FC = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success"
  );

  const navigation = useNavigation();
  const { login, isLoading, isAuthenticated } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Verification" as never }],
      });
    }
  }, [isAuthenticated, navigation]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      const errorMessage = error instanceof Error && error.message;
      setSnackbarMessage(errorMessage || "Login failed. Please try again.");
      setSnackbarType("error");
      setSnackbarVisible(true);
    }
  };

  const showError = (fieldName: keyof LoginFormData) => {
    return touchedFields[fieldName] && !!errors[fieldName];
  };

  const getErrorMessage = (fieldName: keyof LoginFormData) => {
    return touchedFields[fieldName] ? errors[fieldName]?.message : "";
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Logo size={150} />
      </View>

      <View style={styles.formContainer}>
        <Text variant="titleMedium" style={styles.title}>
          Login to continue
        </Text>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  label="Email"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  error={showError("email")}
                  disabled={isLoading}
                />
                <HelperText type="error" visible={showError("email")}>
                  {getErrorMessage("email")}
                </HelperText>
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  label="Password"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  mode="outlined"
                  secureTextEntry
                  autoComplete="password"
                  error={showError("password")}
                  disabled={isLoading}
                />
                <HelperText type="error" visible={showError("password")}>
                  {getErrorMessage("password")}
                </HelperText>
              </View>
            )}
          />

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
            style={styles.loginButton}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </View>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        style={{
          backgroundColor: snackbarType === "success" ? "#4CAF50" : "#F44336",
          zIndex: 1000,
          marginBottom: 60,
        }}
      >
        {snackbarMessage}
      </Snackbar>

      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.copyright}>
          © {new Date().getFullYear()} Ahmadu Bello University, Zaria. Distance
          Learning Centre.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginTop: 70,
    marginBottom: 40,
  },
  formContainer: {
    width: "100%",
    marginBottom: "auto",
  },
  title: {
    textAlign: "left",
    marginBottom: 16,
    color: "#000",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 4,
  },
  loginButton: {
    marginTop: 4,
  },
  surface: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  copyright: {
    color: "#666",
    textAlign: "center",
    fontSize: 12,
  },
});

export default LoginScreen;
