"use client";

import {Tab, Tabs} from "@heroui/react";

export default function BlocksTabs() {
  return (
    <Tabs
      classNames={{
        cursor: "dark:bg-default-100 bg-default-200",
      }}
      radius="full"
      variant="light"
    >
      <Tab key="input" title="Inputs" />
      <Tab key="button" title="Buttons" />
      <Tab key="card" title="Cards" />
    </Tabs>
  );
}
