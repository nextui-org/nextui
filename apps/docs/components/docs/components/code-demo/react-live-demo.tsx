import React from "react";
import {LivePreview, LiveProvider, LiveError} from "react-live";
import {clsx} from "@nextui-org/shared-utils";
import * as Components from "@nextui-org/react";

import {BgGridContainer} from "@/components/bg-grid-container";
import {GradientBox, GradientBoxProps} from "@/components/gradient-box";

export interface ReactLiveDemoProps {
  code: string;
  noInline?: boolean;
  height?: string | number;
  isCentered?: boolean;
  isGradientBox?: boolean;
  className?: string;
  gradientColor?: GradientBoxProps["color"];
  overflow?: "auto" | "visible" | "hidden";
}

export const scope = {
  ...Components,
} as Record<string, unknown>;

export const ReactLiveDemo: React.FC<ReactLiveDemoProps> = ({
  code,
  isGradientBox,
  gradientColor = "orange",
  isCentered = false,
  height,
  className,
  noInline,
}) => {
  const content = (
    <>
      <LivePreview
        className={clsx("live-preview flex h-full w-full not-prose", {
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
          <div className="max-w-full py-4 px-2 w-full h-full scrollbar-hide overflow-x-scroll">
            {content}
          </div>
        </GradientBox>
      ) : (
        <BgGridContainer className={className}>{content}</BgGridContainer>
      )}
    </LiveProvider>
  );
};
