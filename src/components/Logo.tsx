import React from "react";
import { Image, StyleSheet } from "react-native";
import logo from "../../assets/logo.png";

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 40 }) => {
  return (
    <Image
      source={logo}
      style={[styles.logo, { width: size, height: size }]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {},
});

export default Logo;
