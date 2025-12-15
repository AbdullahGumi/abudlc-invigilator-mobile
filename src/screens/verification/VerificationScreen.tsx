import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, Avatar } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useTeamMembers } from "../../hooks/useTeamMembers";
import type { GetCurrentUserPostingTeamQuery } from "../../types/__generated__/graphql";

type TeamMember =
  GetCurrentUserPostingTeamQuery["getCurrentUserPostingTeam"][1];
type AttendanceItem = TeamMember["attendance"][1];

const VerificationScreen = () => {
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();
  const { user } = useCurrentUser();
  const { data: teamMembersData, refetch } = useTeamMembers();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleProfilePress = useCallback(() => {
    navigation.navigate("Profile" as never);
  }, [navigation]);

  const attendanceRecords =
    teamMembersData?.flatMap((member) =>
      member.attendance.map((attendance) => ({
        member,
        attendance,
      })),
    ) || [];

  const filteredRecords = attendanceRecords.filter(
    ({ member }) =>
      (member.user.fullName?.toLowerCase() || "").includes(
        searchText.toLowerCase(),
      ) ||
      (member.user.staffId?.toLowerCase() || "").includes(
        searchText.toLowerCase(),
      ),
  );

  const renderItem = ({
    item,
  }: {
    item: { member: TeamMember; attendance: AttendanceItem };
  }) => (
    <View style={styles.attendanceCard}>
      <Image
        source={{ uri: item.attendance.picture?.uri }}
        style={styles.attendanceImage}
        resizeMode="cover"
      />
      <View style={styles.attendanceDetails}>
        <Text style={styles.attendanceName}>{item.member.user.fullName}</Text>
        <Text style={styles.attendanceInfo}>
          {item.member.user.staffId} -{" "}
          {item.member?.user?.userRole?.role?.displayName}
        </Text>
        <Text style={styles.attendanceTime}>
          {new Date(item.attendance.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="headlineSmall" style={styles.mainTitle}>
          Verifications
        </Text>
        {user?.picture?.uri ? (
          <Avatar.Image
            size={50}
            source={{
              uri: user.picture.uri,
            }}
            style={styles.profileAvatar}
            onTouchEnd={handleProfilePress}
          />
        ) : (
          <TouchableOpacity
            style={styles.avatarFallback}
            onPress={handleProfilePress}
          >
            <Text style={styles.avatarText}>
              {user?.fullName?.[0]?.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search recent verifications..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#999"
      />

      <FlatList
        data={filteredRecords.sort(
          (a, b) =>
            new Date(b.attendance.createdAt).getTime() -
            new Date(a.attendance.createdAt).getTime(),
        )}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.member.id}-${item.attendance.id}`}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          searchText.trim() ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Results Found</Text>
              <Text style={styles.emptySubtitle}>
                No verifications match &quot;{searchText}&quot;
              </Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Recent Verifications</Text>
              <Text style={styles.emptySubtitle}>
                Team member verifications will appear here once completed
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  mainTitle: {
    textAlign: "center",
    color: "#000",
  },
  profileAvatar: {
    backgroundColor: "#f0f0f0",
  },
  avatarFallback: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  attendanceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 8,
  },
  attendanceImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 12,
  },
  attendanceDetails: {
    flex: 1,
  },
  attendanceName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  attendanceInfo: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  attendanceTime: {
    fontSize: 12,
    color: "#888",
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default VerificationScreen;
