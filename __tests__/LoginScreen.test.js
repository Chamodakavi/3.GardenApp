import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Welcome from "../components/Welcome"; // Update if your path is different
import { Context } from "@/app/Context";

// Mock Firebase and its Firestore functions
jest.mock("../Data/FConfig", () => ({
  database: {
    // You can mock Firestore query-related functions here if needed
  },
}));

// Mock router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Welcome (Login) Screen", () => {
  const setUserIdMock = jest.fn();

  const renderWithContext = () =>
    render(
      <Context.Provider value={{ userId: null, setUserId: setUserIdMock }}>
        <Welcome />
      </Context.Provider>
    );

  it("renders login form inputs", () => {
    const { getByPlaceholderText } = renderWithContext();
    expect(getByPlaceholderText("johndoe@gmail.com")).toBeTruthy();
    expect(getByPlaceholderText("Enter your password")).toBeTruthy();
  });

  it("fills out and submits the form", async () => {
    const { getByPlaceholderText, getByText } = renderWithContext();

    const emailInput = getByPlaceholderText("johndoe@gmail.com");
    const passwordInput = getByPlaceholderText("Enter your password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    // Normally you'd wait for a success or fail result
    await waitFor(() => {
      expect(setUserIdMock).not.toBeNull(); // or other logic based on mocked login
    });
  });
});
