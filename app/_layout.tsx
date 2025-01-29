import React, { useEffect, useState } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar"; // expo-status-bar for better control
import { Slot } from "expo-router"; // For rendering child pages
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Layout = () => {
  const colorScheme = useColorScheme(); // Detect system theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // State to store the theme

  useEffect(() => {
    // Check if the colorScheme is dark or light and set the isDarkMode state accordingly
    if (colorScheme === "dark") {
      setIsDarkMode(true); // Set dark mode as true
    } else {
      setIsDarkMode(false); // Set dark mode as false
    }
  }, [colorScheme]);

  return (
    <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      {/* Dynamically set StatusBar background and text color */}
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#000" : "#FFF"} // Black background for dark mode, white background for light mode
      />

      {/* Page content rendered here */}
      <Slot />
    </View>
  );
};

// Define custom styles for light and dark themes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop:hp(3),
  },
  lightBackground: {
    backgroundColor: "#FFF", // Light background for light mode
  },
  darkBackground: {
    backgroundColor: "#333", // Dark background for dark mode
  },
});

export default Layout;
