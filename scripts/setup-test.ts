import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), 
      removeListener: jest.fn(), 
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

global.TextEncoder = require("util").TextEncoder;

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));


configure({
  reactStrictMode: process.env.STRICT_MODE === "true", 
});
