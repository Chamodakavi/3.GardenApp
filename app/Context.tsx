import React, { createContext, useState } from "react";

interface ContextType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  cart: number;
  setCart: React.Dispatch<React.SetStateAction<number>>;
  order: number;
  setOrder: React.Dispatch<React.SetStateAction<number>>;
}

export const Context = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>("");
  const [cart, setCart] = useState<number>(0);
  const [order, setOrder] = useState<number>(0);

  return (
    <Context.Provider
      value={{ userId, setUserId, cart, setCart, order, setOrder }}
    >
      {children}
    </Context.Provider>
  );
}
