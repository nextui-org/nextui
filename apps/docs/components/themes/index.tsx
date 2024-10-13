"use client";

import Configuration from "./components/configuration";
import {Showcase} from "./components/showcase";
import ThemeBuilderProvider from "./provider";

export function ThemeBuilder() {
  return (
    <ThemeBuilderProvider>
      <Configuration />
      <Showcase />
    </ThemeBuilderProvider>
  );
}
