import {Tabs, Tab, Snippet} from "@nextui-org/react";

import Codeblock from "./codeblock";

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
