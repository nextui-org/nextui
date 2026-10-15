import {Tabs} from "@heroui/react";
import React from "react";

export function TabsDemo1() {
  return (
    <Tabs className="w-[256px]">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab id="1d">
            1D
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="7d">
            7D
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="1m">
            1M
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="1y">
            1Y
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="all">
            All
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="pt-2 text-sm text-muted" id="1d">
        Activity for the last day
      </Tabs.Panel>
      <Tabs.Panel className="pt-2 text-sm text-muted" id="7d">
        Activity for the last week
      </Tabs.Panel>
      <Tabs.Panel className="pt-2 text-sm text-muted" id="1m">
        Activity for the last month
      </Tabs.Panel>
      <Tabs.Panel className="pt-2 text-sm text-muted" id="1y">
        Activity for the last year
      </Tabs.Panel>
      <Tabs.Panel className="pt-2 text-sm text-muted" id="all">
        All activity
      </Tabs.Panel>
    </Tabs>
  );
}
