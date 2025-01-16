"use client";

import {useEffect, useState} from "react";
import {Progress} from "@nextui-org/react";

import Configuration from "./components/configuration";
import {Showcase} from "./components/showcase";
import ThemeBuilderProvider from "./provider";

export function ThemeBuilder() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <ThemeBuilderProvider>
      <Showcase />
      <Configuration />
    </ThemeBuilderProvider>
  ) : (
    <div className="flex justify-center items-center w-full h-min md:h-[calc(100vh-15rem)]">
      <Progress isIndeterminate label="Loading theme generator" />
    </div>
  );
}
