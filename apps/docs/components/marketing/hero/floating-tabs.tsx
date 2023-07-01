"use client";

import {Tab, Tabs} from "@nextui-org/react";

export const FloatingTabs: React.FC<{}> = () => {
  return (
    <Tabs
      aria-label="Floating tabs example"
      className=""
      classNames={{
        base: "absolute left-[170px] -top-[160px] h-10 animate-[levitate_17s_ease_infinite_1s]",
        tabList: "max-w-[200px] shadow-sm",
      }}
      radius="full"
      size="sm"
    >
      <Tab key="notes" title="Notes" />
      <Tab key="tasks" title="Tasks" />
      <Tab key="files" title="Files" />
    </Tabs>
  );
};
