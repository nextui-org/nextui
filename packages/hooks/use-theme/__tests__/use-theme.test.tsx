import * as React from "react";
import {render, act} from "@testing-library/react";

import {useTheme, ThemeProps, Theme} from "../src";

const TestComponent = ({defaultTheme}: {defaultTheme?: Theme}) => {
  const {theme, setTheme} = useTheme(defaultTheme);

  return (
    <div>
      <span data-testid="theme-display">{theme}</span>
      <button type="button" onClick={() => setTheme(ThemeProps.DARK)}>
        Set Dark
      </button>
      <button type="button" onClick={() => setTheme(ThemeProps.LIGHT)}>
        Set Light
      </button>
    </div>
  );
};

TestComponent.displayName = "TestComponent";

const localStorageMock = (() => {
  let store: {[key: string]: string} = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useTheme hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    localStorage.clear();

    document.documentElement.className = "";
  });

  it("should initialize with default theme if no theme is stored in localStorage", () => {
    const {getByTestId} = render(<TestComponent />);

    expect(getByTestId("theme-display").textContent).toBe(ThemeProps.LIGHT);
    expect(document.documentElement.classList.contains(ThemeProps.LIGHT)).toBe(true);
  });

  it("should initialize with the given theme if no theme is stored in localStorage", () => {
    const customTheme = "purple-dark";
    const {getByTestId} = render(<TestComponent defaultTheme={customTheme} />);

    expect(getByTestId("theme-display").textContent).toBe(customTheme);
    expect(document.documentElement.classList.contains(customTheme)).toBe(true);
  });

  it("should initialize with stored theme from localStorage", () => {
    localStorage.setItem(ThemeProps.KEY, ThemeProps.DARK);

    const {getByTestId} = render(<TestComponent />);

    expect(localStorage.getItem(ThemeProps.KEY)).toBe(ThemeProps.DARK);

    expect(getByTestId("theme-display").textContent).toBe(ThemeProps.DARK);
    expect(document.documentElement.classList.contains(ThemeProps.DARK)).toBe(true);
  });

  it("should set new theme correctly and update localStorage and DOM", () => {
    const {getByText, getByTestId} = render(<TestComponent />);

    act(() => {
      getByText("Set Dark").click();
    });
    expect(getByTestId("theme-display").textContent).toBe(ThemeProps.DARK);
    expect(localStorage.getItem(ThemeProps.KEY)).toBe(ThemeProps.DARK);
    expect(document.documentElement.classList.contains(ThemeProps.DARK)).toBe(true);
  });
});
