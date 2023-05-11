import {Tabs, TabItem, Snippet} from "@nextui-org/react";

import {Codeblock} from "./codeblock";

import {YarnIcon, NpmSmallIcon, PnpmIcon} from "@/components/icons";

type PackageManagerName = "npm" | "yarn" | "pnpm";

type PackageManager = {
  icon: JSX.Element;
  name: PackageManagerName;
};

const packageManagers: PackageManager[] = [
  {
    name: "npm",
    icon: <NpmSmallIcon className="text-[#E53E3E]" />,
  },
  {
    name: "yarn",
    icon: <YarnIcon className="text-[#2C8EBB]" />,
  },
  {
    name: "pnpm",
    icon: <PnpmIcon className="text-[#F69220]" />,
  },
];

export interface PackageManagersProps {
  commands: Partial<Record<PackageManagerName, string>>;
}

export const PackageManagers = ({commands}: PackageManagersProps) => {
  return (
    <Tabs
      aria-label="NextUI installation commands"
      classNames={{
        base: "mt-4",
      }}
      variant="underlined"
    >
      {packageManagers.map(({name, icon}) => {
        if (!commands[name]) return null;

        return (
          <TabItem
            key={name}
            title={
              <div className="flex items-center space-x-2">
                {icon}
                <span>{name}</span>
              </div>
            }
          >
            <Snippet
              disableTooltip
              fullWidth
              hideSymbol
              classNames={{
                base: "bg-code-background text-code-foreground",
                pre: "font-light text-base",
                copyButton: "text-lg text-code-foreground/50",
              }}
            >
              <Codeblock codeString={commands[name] as string} language="bash" />
            </Snippet>
          </TabItem>
        );
      })}
    </Tabs>
  );
};
