import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Welcome from "../components/Welcome"; // Update path if needed
import { Context } from "@/app/Context";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

// 🔹 Mock Firestore functions
jest.mock("firebase/firestore", () => {
  return {
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
  };
});

import { collection, query, where, getDocs } from "firebase/firestore";

describe("Welcome (Login) Screen", () => {
  const pushMock = jest.fn();
  const setUserIdMock = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: pushMock });

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocks after each test
  });

  const renderWithContext = () =>
    render(
      <Context.Provider value={{ userId: null, setUserId: setUserIdMock }}>
        <Welcome />
      </Context.Provider>
    );

  it("renders the login form fields", () => {
    const { getByPlaceholderText, getByText } = renderWithContext();

    expect(getByPlaceholderText("johndoe@gmail.com")).toBeTruthy();
    expect(getByPlaceholderText("Enter your password")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
  });

  it("logs in successfully with valid credentials", async () => {
    const mockDoc = {
      data: () => ({
        password: "password123",
      }),
      id: "user123",
    };

    // Mocking the getDocs response: first check by email fails, then by username
    getDocs
      .mockResolvedValueOnce({ empty: true }) // first check by email fails
      .mockResolvedValueOnce({ empty: false, docs: [mockDoc] }); // username match

    const { getByPlaceholderText, getByText } = renderWithContext();

    fireEvent.changeText(
      getByPlaceholderText("johndoe@gmail.com"),
      "myUsername"
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter your password"),
      "password123"
    );
    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(setUserIdMock).toHaveBeenCalledWith("user123");
      expect(pushMock).toHaveBeenCalledWith("/home");
    });
  });

  it("shows alert if password is incorrect", async () => {
    // Mock Alert.alert here
    jest.spyOn(Alert, "alert").mockImplementation(() => {});

    const mockDoc = {
      data: () => ({
        password: "correctPass",
      }),
      id: "user123",
    };

    getDocs
      .mockResolvedValueOnce({ empty: true }) // email not found
      .mockResolvedValueOnce({ empty: false, docs: [mockDoc] }); // username found

    const { getByPlaceholderText, getByText } = renderWithContext();

    fireEvent.changeText(
      getByPlaceholderText("johndoe@gmail.com"),
      "myUsername"
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter your password"),
      "wrongPass"
    );
    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(setUserIdMock).not.toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith("Invalid Password"); // Check that Alert.alert was called with the correct message
    });

    Alert.alert.mockRestore(); // Restore after use
  });

  it("shows alert when user is not found", async () => {
    // Mock Alert.alert here
    jest.spyOn(Alert, "alert").mockImplementation(() => {});

    getDocs
      .mockResolvedValueOnce({ empty: true }) // email
      .mockResolvedValueOnce({ empty: true }); // username

    const { getByPlaceholderText, getByText } = renderWithContext();

    fireEvent.changeText(getByPlaceholderText("johndoe@gmail.com"), "noUser");
    fireEvent.changeText(
      getByPlaceholderText("Enter your password"),
      "anything"
    );
    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(setUserIdMock).not.toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith("User not found"); // Check that Alert.alert was called with the correct message
    });

    Alert.alert.mockRestore(); // Restore after use
  });

  it("shows loading indicator while logging in", async () => {
    const { getByText, getByTestId } = renderWithContext();

    fireEvent.changeText(
      getByPlaceholderText("johndoe@gmail.com"),
      "myUsername"
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter your password"),
      "password123"
    );
    fireEvent.press(getByText("Login"));

    // Check if loading indicator appears
    expect(getByTestId("loading-indicator")).toBeTruthy();

    await waitFor(() => {
      expect(setUserIdMock).toHaveBeenCalledWith("user123");
      expect(pushMock).toHaveBeenCalledWith("/home");
    });

    // Check if loading indicator disappears
    expect(getByTestId("loading-indicator")).not.toBeTruthy(); // Ensure it's not visible after login
  });
});
