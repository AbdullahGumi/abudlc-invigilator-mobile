import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import useCurrentUser from "../../hooks/useCurrentUser";
import useAuth from "../../hooks/useAuth";

const ProfileScreen: React.FC = () => {
  const { user } = useCurrentUser();
  const { clearAuthState } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    clearAuthState();
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL("https://abudlc.com/privacy-policy");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <View style={styles.profileCard}>
            <View style={styles.cardContent}>
              <View style={styles.avatarContainer}>
                {user?.picture?.uri ? (
                  <Image
                    source={{
                      uri: user?.picture?.uri,
                    }}
                    style={styles.avatar}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarText}>
                      {user?.fullName?.[0]?.toUpperCase() || "?"}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.userInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Name</Text>
                  <Text style={styles.value}>{user?.fullName}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{user?.email}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Staff ID</Text>
                  <Text style={styles.value}>{user?.staffId}</Text>
                </View>

                {user?.userRole?.role && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Role</Text>
                    <Text style={styles.value}>
                      {user?.userRole.role.displayName}
                    </Text>
                  </View>
                )}

                {user?.rank && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Rank</Text>
                    <Text style={styles.value}>{user?.rank.name}</Text>
                  </View>
                )}

                {user?.phoneNumber && (
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.value}>{user?.phoneNumber}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={24}
                color="#fff"
                style={styles.logoutIcon}
              />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePrivacyPolicy}>
              <Text style={styles.privacyPolicyText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    // paddingTop: 24,
    // backgroundColor: "blue",
  },
  centerContainer: {
    alignItems: "center",
    maxWidth: 800,
    width: "100%",
    // backgroundColor: "red",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  backButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  profileCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderColor: "#e0e0e0",
    marginBottom: 24,
  },
  cardContent: {
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
  },
  avatarFallback: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
    color: "#000",
  },
  infoRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    paddingVertical: 8,
    borderColor: "#e0e0e0",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "300",
    color: "#666",
    textAlign: "left",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#292929ff",
    textAlign: "left",
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  logoutButton: {
    borderColor: "#d50505ff",
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#d50505ff",
    fontWeight: "500",
  },
  logoutIcon: {
    color: "#d50505ff",
    marginRight: 8,
  },
  privacyPolicyText: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "underline",
    marginTop: 16,
    textAlign: "center",
  },
});

export default ProfileScreen;
