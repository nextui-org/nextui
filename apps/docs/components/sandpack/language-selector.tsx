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
        base: "absolute right-4 bottom-6",
      }}
      onSelectionChange={handleToggle}
    >
      <TabItem key="javascript" title={<JavascriptIcon />} />
      <TabItem key="typescript" title={<TypescriptIcon />} />
    </Tabs>
  );
};
