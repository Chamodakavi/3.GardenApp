import React from "react";
import { ContextProvider } from "./Context";
import { Slot } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";

export default function App() {
  const theme = useColorScheme(); // Detect system theme (light/dark)

  return (
    <>
      <ContextProvider>
        <Slot />
      </ContextProvider>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "black" : "white"}
      />
    </>
  );
}
