import React from "react";
import { ContextProvider } from "./Context";
import { Slot } from "expo-router";

export default function App() {
  return (
    <ContextProvider>
      <Slot />
    </ContextProvider>
  );
}
