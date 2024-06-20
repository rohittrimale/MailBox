import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../slice/userSlice";
import { Signup } from "./Signup";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";

const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: { user: userReducer }, preloadedState }),
  } = {}
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("Signup component", () => {
  test("renders correctly", () => {
    renderWithProviders(<Signup />);

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Account/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Already have an Account/i)).toBeInTheDocument();
  });

  test("validates form input correctly", async () => {
    renderWithProviders(<Signup />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "short" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "short" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    expect(
      await screen.findByText(/This is not a valid email./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Password is too short/i)
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "valid@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "validpassword" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "differentpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    expect(
      await screen.findByText(/Passwords don't match/i)
    ).toBeInTheDocument();
  });
});
