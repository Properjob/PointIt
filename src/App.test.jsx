import React from "react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "./utils/test-utils";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    vi.mock("react-pouchdb", () => ({
      useAllDocs: vi.fn().mockReturnValue([]),
      useDB: vi.fn(),
      useGet: vi.fn(),
    }));
  });

  it("should have a base title", () => {
    render(<App />);
    expect(screen.queryByText(/^Base$/)).toBeDefined();
  });

  it("should have a target title", () => {
    render(<App />);
    expect(screen.queryByText(/^Target$/)).toBeDefined();
  });
});
