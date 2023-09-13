import {Tabs, Tab, Snippet} from "@nextui-org/react";

import Codeblock from "./codeblock";

import {trackEvent} from "@/utils/va";

type PackageManager = {
  key: string;
  name: string;
};

const importTabs: PackageManager[] = [
  {
    key: "main",
    name: "Main",
  },
  {
    key: "individual",
    name: "Individual",
  },
];

export interface ImportTabsProps {
  commands: Record<string, string>;
}

export const ImportTabs = ({commands}: ImportTabsProps) => {
  return (
    <Tabs
      disableAnimation
      aria-label="NextUI import commands"
      classNames={{
        base: "group mt-4",
        tabList: "relative h-10",
      }}
      variant="underlined"
      onSelectionChange={(tabKey) => {
        trackEvent("ImportTabs - Selection", {
          name: tabKey as string,
          action: "tabChange",
          category: "docs",
          data: commands[tabKey] ?? "",
        });
      }}
    >
      {importTabs.map(({key, name}) => {
        if (!commands[key]) return null;

        return (
          <Tab key={key} title={name}>
            <Snippet
              disableTooltip
              fullWidth
              hideSymbol
              classNames={{
                base: "bg-code-background text-code-foreground",
                pre: "font-light text-base",
                copyButton: "text-lg text-default-400",
              }}
              onCopy={() => {
                trackEvent("ImportTabs - Copy", {
                  name,
                  action: "copyInstallScript",
                  category: "docs",
                  data: commands[name] ?? "",
                });
              }}
            >
              <Codeblock
                hideScrollBar
                removeIndent
                codeString={commands[key] as string}
                language="jsx"
              />
            </Snippet>
          </Tab>
        );
      })}
    </Tabs>
  );
};
