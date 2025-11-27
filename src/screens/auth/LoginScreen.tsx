import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Snackbar,
  HelperText,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Logo from "../../components/Logo";
import useLoginWithPassword, {
  loginSchema,
  type LoginFormData,
} from "../../hooks/useLoginWithPassword";
import useAuth from "../../hooks/useAuth";
import { SNACKBAR_COLORS } from "../../constants";

const LoginScreen: React.FC = () => {
  const { setAuthState } = useAuth();
  const { login, loading, error, onReset } = useLoginWithPassword();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    const data = await login(values);

    if (data?.accessToken && data?.refreshToken) {
      await setAuthState({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    }
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
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
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
                  error={!!error}
                  disabled={loading}
                />
                <HelperText type="error" visible={!!error}>
                  {error?.message}
                </HelperText>
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  label="Password"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  mode="outlined"
                  secureTextEntry
                  autoComplete="password"
                  error={!!error}
                  disabled={loading}
                />
                <HelperText type="error" visible={!!error}>
                  {error?.message}
                </HelperText>
              </View>
            )}
          />

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
            style={styles.loginButton}
          >
            Login
          </Button>
        </View>
      </View>

      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.copyright}>
          © {new Date().getFullYear()} Ahmadu Bello University, Zaria. Distance
          Learning Centre.
        </Text>
      </View>

      {error && (
        <Snackbar
          visible={!!error}
          onDismiss={onReset}
          style={{
            backgroundColor: SNACKBAR_COLORS.ERROR.background,
          }}
        >
          <Text style={{ color: SNACKBAR_COLORS.ERROR.text }}>
            {error?.message}
          </Text>
        </Snackbar>
      )}
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
