import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Menu, Avatar, Text, Divider } from "react-native-paper";

import { useAuth } from "../contexts/AuthContext";

const AccountMenu: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const navigation = useNavigation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = async () => {
    closeMenu();
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" as never }],
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Menu
        key={visible ? "open" : "closed"}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu} style={styles.menuTrigger}>
            {user.picture?.thumbnailUri ? (
              <Avatar.Image
                size={40}
                source={{ uri: user.picture.thumbnailUri }}
                style={styles.avatar}
              />
            ) : (
              <Avatar.Text
                size={40}
                label={user.fullName?.[0]?.toUpperCase() ?? ""}
                style={styles.avatar}
              />
            )}
          </TouchableOpacity>
        }
        anchorPosition="bottom"
        mode="elevated"
        contentStyle={{ backgroundColor: "white" }}
      >
        <View style={styles.menuContent}>
          <View style={styles.userInfo}>
            {user.picture?.thumbnailUri ? (
              <Avatar.Image
                size={48}
                source={{ uri: user.picture.thumbnailUri }}
                style={styles.menuAvatar}
              />
            ) : (
              <Avatar.Text
                size={48}
                label={user.fullName?.[0]?.toUpperCase() ?? ""}
                style={styles.menuAvatar}
              />
            )}
            <View style={styles.userDetails}>
              <Text variant="titleMedium" style={styles.userName}>
                {user.fullName}
              </Text>
              <Text variant="bodySmall" style={styles.userEmail}>
                {user.email}
              </Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <Menu.Item
            onPress={handleLogout}
            title="Logout"
            leadingIcon="logout"
            disabled={isLoading}
            titleStyle={styles.logoutText}
          />
        </View>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  menuTrigger: {
    borderRadius: 20,
  },
  avatar: {
    backgroundColor: "green",
  },
  menuContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 250,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  menuAvatar: {
    marginRight: 16,
    backgroundColor: "green",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: "600",
    marginBottom: 4,
  },
  userEmail: {
    color: "#666",
  },
  divider: {
    marginVertical: 8,
  },
  logoutText: {
    color: "#d32f2f",
  },
});

export default AccountMenu;
