import React from "react";
import { View, StyleSheet } from "react-native";
import { Menu, Button, Text } from "react-native-paper";
import { Posting } from "../types";

interface SelectTeamMemberProps {
  value: string;
  onChange: (value: string) => void;
  teamMembers: Posting[];
  loading?: boolean;
}

const SelectTeamMember: React.FC<SelectTeamMemberProps> = ({
  value,
  onChange,
  teamMembers,
  loading = false,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [menuKey, setMenuKey] = React.useState(0);  
  const selectedMember = teamMembers.find((member) => member.id === value);

  const openMenu = () => setVisible(true);
  const closeMenu = () => {
    setVisible(false);
    setMenuKey(prev => prev + 1); 
  };

  const handleSelect = (memberId: string) => {
    onChange(memberId);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Team Member</Text>
      <Menu
        key={menuKey} 
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            style={styles.selectButton}
            disabled={loading}
            loading={loading}
          >
            {selectedMember
              ? `${selectedMember.user.fullName} (${selectedMember.user.staffId})`
              : "Select a team member..."}
          </Button>
        }
        contentStyle={{
          backgroundColor: 'white'
        }}
      >
        {teamMembers.map((member) => (
          <Menu.Item
            key={member.id}
            onPress={() => handleSelect(member.id)}
            title={`${member.user.fullName} (${member.user.staffId})`}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#000",
  },
  selectButton: {
    width: "100%",
    justifyContent: "flex-start",
  },
});

export default SelectTeamMember;
