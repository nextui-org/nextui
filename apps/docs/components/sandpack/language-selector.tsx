import React from "react";
import {Tabs, TabItem} from "@nextui-org/react";
import {SandpackPredefinedTemplate} from "@codesandbox/sandpack-react";

import {TypescriptIcon, JavascriptIcon} from "@/components/icons";

interface Props {
  template: SandpackPredefinedTemplate;
  onChange?: (template: SandpackPredefinedTemplate) => void;
}

export type LanguageSelectorProps = Props;

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({template, onChange}) => {
  const handleToggle = () => {
    const newTemplate = template === "vite-react" ? "vite-react-ts" : "vite-react";

    onChange?.(newTemplate);
  };

  return (
    <Tabs
      aria-label="Language selector"
      classNames={{
        base: "absolute right-3 bottom-10",
        cursor: "bg-zinc-400 dark:bg-zinc-700",
        tabList:
          "bg-transparent relative before:bg-white/5 before:w-full before:rounded-lg before:h-full before:content-[''] before:block before:z-1 before:absolute before:inset-0 before:backdrop-blur-md before:backdrop-saturate-100",
      }}
      radius="md"
      selectedKey={template}
      size="xs"
      onSelectionChange={handleToggle}
    >
      <TabItem key="vite-react-ts" title={<TypescriptIcon className="text-lg text-[#93adcb]" />} />
      <TabItem key="vite-react" title={<JavascriptIcon className="text-lg  text-[#dbbe82]" />} />
    </Tabs>
  );
};
