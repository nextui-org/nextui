import React, {useCallback} from "react";
import {Tabs, Tab} from "@nextui-org/react";
import {SandpackPredefinedTemplate} from "@codesandbox/sandpack-react";

import {TypescriptIcon, JavascriptIcon} from "@/components/icons";

interface Props {
  template: SandpackPredefinedTemplate;
  onChange?: (template: SandpackPredefinedTemplate) => void;
}

export type LanguageSelectorProps = Props;

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({template, onChange}) => {
  const [selectedTemplate, setSelectedTemplate] = React.useState(template);

  const handleToggle = useCallback(() => {
    const newTemplate = template === "vite-react" ? "vite-react-ts" : "vite-react";

    setSelectedTemplate(newTemplate);

    setTimeout(() => {
      onChange?.(newTemplate);
    }, 250);
  }, [template, onChange]);

  return (
    <Tabs
      aria-label="Language selector"
      classNames={{
        base: "absolute z-10 right-3 bottom-4",
        cursor: "bg-zinc-400 dark:bg-zinc-700",
        tabList:
          "bg-transparent relative before:bg-white/5 before:w-full before:rounded-lg before:h-full before:content-[''] before:block before:z-1 before:absolute before:inset-0 before:backdrop-blur-md before:backdrop-saturate-100",
      }}
      radius="md"
      selectedKey={selectedTemplate}
      size="sm"
      onSelectionChange={handleToggle}
    >
      <Tab
        key="vite-react-ts"
        title={
          <TypescriptIcon className="text-lg text-white dark:text-[#6b6b6b] group-data-[selected=true]:text-[#fafafa]" />
        }
      />
      <Tab
        key="vite-react"
        title={
          <JavascriptIcon className="text-lg text-white dark:text-[#6b6b6b] group-data-[selected=true]:text-[#fafafa]" />
        }
      />
    </Tabs>
  );
};
