import React from "react";
import {LivePreview, LiveProvider, LiveError} from "react-live";
import * as Components from "@nextui-org/react";

import {BgGridContainer} from "@/components/bg-grid-container";
import {GradientBox, GradientBoxProps} from "@/components/gradient-box";

export interface ReactLiveDemoProps {
  code: string;
  height?: string | number;
  noInline?: boolean;
  showWindowActions?: boolean;
  iframeSrc?: string;
  iframeTitle?: string;
  iframeInitialWidth?: number;
  enableResize?: boolean;
  isGradientBox?: boolean;
  gradientColor?: GradientBoxProps["color"];
  overflow?: "auto" | "visible" | "hidden";
}

export const scope = {
  ...Components,
} as Record<string, unknown>;

{
  /* <GradientBox isCentered className="py-14 px-4 lg:px-8" color="orange" to="top-right">

</GradientBox> */
}
export const ReactLiveDemo: React.FC<ReactLiveDemoProps> = ({
  code,
  isGradientBox,
  gradientColor = "orange",
  noInline,
}) => {
  const content = (
    <>
      <LivePreview className="live-preview flex h-full w-full not-prose" />
      <LiveError />
    </>
  );

  return (
    <LiveProvider code={code} noInline={noInline} scope={scope}>
      {isGradientBox ? (
        <GradientBox
          isCentered
          className="relative overflow-y-hidden flex items-center border border-default-200 dark:border-default-100 px-2 py-4 rounded-lg overflow-hidden"
          color={gradientColor}
          to="top-right"
        >
          <div className="max-w-full py-4 px-2 w-full h-full scrollbar-hide overflow-x-scroll">
            {content}
          </div>
        </GradientBox>
      ) : (
        <BgGridContainer>{content}</BgGridContainer>
      )}
    </LiveProvider>
  );
};
