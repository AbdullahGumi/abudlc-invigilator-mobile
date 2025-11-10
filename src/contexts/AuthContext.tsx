import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

import { AuthContextType, LoginFormData, User } from "../types";
import { STORAGE_KEYS } from "../constants";
import useLoginWithPassword from "../hooks/useLoginWithPassword";
import { GET_USER_SESSION } from "../hooks/useLoginWithPassword/mutation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: sessionData } = useQuery(GET_USER_SESSION, {
    skip: !user,
  });

  const { login: loginWithPassword, loading: loginLoading } =
    useLoginWithPassword();

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    if (sessionData?.me) {
      setUser(sessionData.me as User);
    }
  }, [sessionData]);

  const checkAuthState = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync(
        STORAGE_KEYS.ACCESS_TOKEN,
      );
      const userData = await SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA);

      if (accessToken && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.warn("Error checking auth state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginFormData) => {
    const result = await loginWithPassword(data);

    if (result?.success && result.user) {
      await SecureStore.setItemAsync(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify(result.user),
      );
      setUser(result.user as User);
    } else {
      throw new Error(result?.message || "Login failed");
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA);

      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading || loginLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
