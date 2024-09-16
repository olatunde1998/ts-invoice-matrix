import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/[locale]/page";

describe("Dashboard Page Component", () => {
  test("Should renders Properly", () => {
    const { getByText } = render(<Home />);
    // Test for the welcome message
    const welcomeMessage = getByText("Welcome to Total Secure Invoice Matrix");
    expect(welcomeMessage).toBeInTheDocument();
  });
});
