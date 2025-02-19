import React, { createContext, useState } from "react";

interface ContextType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

// Provide a default value for better type safety
export const Context = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState("");

  return (
    <Context.Provider value={{ userId, setUserId }}>
      {children}
    </Context.Provider>
  );
}
