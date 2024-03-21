import {Tabs, Tab, Snippet} from "@nextui-org/react";
import {Key} from "react";
import {useLocalStorage} from "usehooks-ts";

import Codeblock from "./codeblock";

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
  commands: Partial<Record<PackageManagerName, React.Key>>;
}

export const PackageManagers = ({commands}: PackageManagersProps) => {
  const [selectedManager, setSelectedManager] = useLocalStorage<PackageManagerName>(
    "selectedPackageManager",
    "npm",
  );

  const handleSelectionChange = (tabKey: Key) => {
    setSelectedManager(tabKey as PackageManagerName);
  };

  return (
    <Tabs
      aria-label="NextUI installation commands"
      classNames={{
        base: "group mt-4",
        tabList: "h-10",
      }}
      selectedKey={selectedManager}
      variant="underlined"
      onSelectionChange={handleSelectionChange}
    >
      {packageManagers.map(({name, icon}) => {
        if (!commands[name]) return null;

        return (
          <Tab
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
                copyButton: "text-lg text-zinc-500 mr-2",
              }}
            >
              <Codeblock removeIndent codeString={commands[name] as string} language="bash" />
            </Snippet>
          </Tab>
        );
      })}
    </Tabs>
  );
};
