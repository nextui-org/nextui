import React from "react";
import {LivePreview, LiveProvider, LiveError} from "react-live";
import {clsx} from "@nextui-org/shared-utils";
import * as NextUI from "@nextui-org/react";
import * as intlDateUtils from "@internationalized/date";
import * as reactAriaI18n from "@react-aria/i18n";
import * as reactHookFormBase from "react-hook-form";
import {SandpackFiles} from "@codesandbox/sandpack-react/types";

import {BgGridContainer} from "@/components/bg-grid-container";
import {GradientBox, GradientBoxProps} from "@/components/gradient-box";
import {CopyButton} from "@/components/copy-button";

export interface ReactLiveDemoProps {
  code: string;
  files: SandpackFiles;
  noInline?: boolean;
  height?: string | number;
  isCentered?: boolean;
  isGradientBox?: boolean;
  className?: string;
  gradientColor?: GradientBoxProps["color"];
  overflow?: "auto" | "visible" | "hidden";
}

// 🚨 Do not pass react-hook-form to scope, it will break the live preview since
// it also has a "Form" component that will override the one from @nextui-org/react
const reactHookForm = {
  useForm: reactHookFormBase.useForm,
  Controller: reactHookFormBase.Controller,
};

export const scope = {
  React,
  ...NextUI,
  ...intlDateUtils,
  ...reactAriaI18n,
  ...reactHookForm,
} as Record<string, unknown>;

const DEFAULT_FILE = "/App.jsx";

export const ReactLiveDemo: React.FC<ReactLiveDemoProps> = ({
  code,
  files,
  isGradientBox,
  gradientColor = "orange",
  isCentered = false,
  height,
  className,
  noInline,
}) => {
  const content = (
    <>
      {files?.[DEFAULT_FILE] && (
        <div className="absolute top-[-28px] right-[-8px] z-50">
          <CopyButton
            className="before:hidden opacity-0 group-hover/code-demo:opacity-100 transition-opacity text-zinc-400"
            value={files?.[DEFAULT_FILE] as string}
          />
        </div>
      )}
      <LivePreview
        className={clsx("live-preview flex h-full w-full not-prose ", {
          "justify-center items-center": isCentered,
        })}
        style={{height}}
      />
      <LiveError />
    </>
  );

  return (
    <LiveProvider code={code} noInline={noInline} scope={scope}>
      {isGradientBox ? (
        <GradientBox
          isCentered
          className={clsx(
            className,
            "relative overflow-y-hidden flex items-center border border-default-200 dark:border-default-100 px-2 py-4 rounded-lg overflow-hidden",
          )}
          color={gradientColor}
          to="top-right"
        >
          <div className="group/code-demo max-w-full py-4 px-2 w-full h-full scrollbar-hide overflow-x-scroll">
            {content}
          </div>
        </GradientBox>
      ) : (
        <BgGridContainer className={clsx(className, "group/code-demo")}>{content}</BgGridContainer>
      )}
    </LiveProvider>
  );
};
