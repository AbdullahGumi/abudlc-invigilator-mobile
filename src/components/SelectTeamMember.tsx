import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SelectDropdown from "react-native-select-dropdown";
import { Posting } from "../types";

interface SelectTeamMemberProps {
  onChange: (value: string) => void;
  teamMembers: Posting[];
  loading?: boolean;
}

const SelectTeamMember: React.FC<SelectTeamMemberProps> = ({
  onChange,
  teamMembers,
  loading = false,
}) => {
  return (
    <View style={styles.container}>
      <SelectDropdown
        data={teamMembers}
        onSelect={(selectedItem: Posting) => {
          onChange(selectedItem.id);
        }}
        disabled={loading}
        renderButton={(selectedItem: Posting | null, isOpened: boolean) => (
          <View style={styles.selectButton}>
            <Text style={styles.buttonText}>
              {selectedItem
                ? `${selectedItem.user.fullName} (${selectedItem.user.staffId})`
                : "Select a team member..."}
            </Text>
            <MaterialIcons
              name={isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color="#666"
              style={styles.dropdownIcon}
            />
          </View>
        )}
        renderItem={(item: Posting) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {`${item.user.fullName} (${item.user.staffId})`}
            </Text>
          </View>
        )}
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
    borderRadius: 4,
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
    borderRadius: 4,
  },
  row: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowText: {
    fontSize: 16,
    color: "#000",
  },
  dropdownIcon: {
    position: "absolute",
    right: 12,
  },
});

export default SelectTeamMember;
