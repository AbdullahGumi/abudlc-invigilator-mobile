import React, { useRef, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SelectDropdown from "react-native-select-dropdown";
import { GetCurrentUserPostingTeamQuery } from "../types/__generated__/graphql";

type TeamMember =
  GetCurrentUserPostingTeamQuery["getCurrentUserPostingTeam"][0];

interface SelectTeamMemberProps {
  onChange: (value: string) => void;
  teamMembers: TeamMember[];
  loading?: boolean;
  disabled?: boolean;
}

const SelectTeamMember: React.FC<SelectTeamMemberProps> = ({
  onChange,
  teamMembers,
  loading = false,
  disabled = false,
}) => {
  const dropdownRef = useRef<SelectDropdown>(null);
  const [resetKey, setResetKey] = useState(0);

  return (
    <View style={styles.container}>
      <SelectDropdown
        key={resetKey}
        ref={dropdownRef}
        data={teamMembers}
        onSelect={(selectedItem: TeamMember) => {
          onChange(selectedItem.id);
        }}
        disabled={loading || disabled}
        renderButton={(selectedItem: TeamMember | null, isOpened: boolean) => (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => dropdownRef.current?.openDropdown()}
          >
            <Text style={styles.buttonText}>
              {selectedItem
                ? `${selectedItem.user.fullName} (${selectedItem.user.staffId})`
                : "Select a team member..."}
            </Text>
            {selectedItem ? (
              <TouchableOpacity
                style={[styles.clearIcon, disabled && styles.disabled]}
                disabled={disabled}
                onPress={() => {
                  onChange("");
                  setResetKey((prev) => prev + 1);
                }}
              >
                <MaterialIcons
                  name="clear"
                  size={20}
                  color={disabled ? "#ccc" : "#666"}
                />
              </TouchableOpacity>
            ) : (
              <MaterialIcons
                name={isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
                color="#666"
                style={styles.dropdownIcon}
              />
            )}
          </TouchableOpacity>
        )}
        renderItem={(item: TeamMember) => {
          const isVerified = item.user.status?.id === "ACTIVE";
          const hasPicture = item.user.picture?.uri;
          const firstLetter = item.user.fullName?.[0]?.toUpperCase() || "?";

          return (
            <View style={styles.row}>
              {hasPicture ? (
                <Image
                  source={{ uri: item.user.picture!.uri }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarText}>{firstLetter}</Text>
                </View>
              )}
              <View style={styles.textContainer}>
                <View style={styles.nameRow}>
                  <Text style={styles.nameText}>{item.user.fullName}</Text>
                  {isVerified && (
                    <MaterialIcons
                      name="check-circle"
                      size={16}
                      color="#07800dff"
                      style={styles.verifiedIcon}
                    />
                  )}
                </View>
                <Text style={styles.detailsText}>
                  {item.user.staffId} - {item.user.userRole?.role.displayName}
                </Text>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  selectButton: {
    width: "100%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    backgroundColor: "#fff",
  },
  buttonText: {
    textAlign: "left",
    fontSize: 16,
    color: "#000",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  textContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    color: "#000",
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  detailsText: {
    fontSize: 14,
    color: "#666",
  },
  dropdownIcon: {
    position: "absolute",
    right: 12,
  },
  clearIcon: {
    position: "absolute",
    right: 12,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default SelectTeamMember;
