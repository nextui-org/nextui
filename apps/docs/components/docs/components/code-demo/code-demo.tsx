"use client";

import React, {useCallback, useMemo, useRef} from "react";
import dynamic from "next/dynamic";
import {Skeleton, Tab, Tabs} from "@nextui-org/react";
import {useInView} from "framer-motion";

import {useCodeDemo, UseCodeDemoProps} from "./use-code-demo";
import WindowResizer, {WindowResizerProps} from "./window-resizer";

import {GradientBoxProps} from "@/components/gradient-box";

const DynamicReactLiveDemo = dynamic(
  () => import("./react-live-demo").then((m) => m.ReactLiveDemo),
  {
    ssr: false,
    // eslint-disable-next-line react/display-name
    loading: () => <Skeleton className="w-full h-24 rounded-xl" />,
  },
);

const DynamicSandpack = dynamic(() => import("../../../sandpack").then((m) => m.Sandpack), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <Skeleton className="w-full h-32 rounded-xl" />,
});

interface CodeDemoProps extends UseCodeDemoProps, WindowResizerProps {
  title?: string;
  asIframe?: boolean;
  showSandpackPreview?: boolean;
  initialEditorOpen?: boolean;
  enableResize?: boolean;
  showTabs?: boolean;
  showPreview?: boolean;
  showOpenInCodeSandbox?: boolean;
  isPreviewCentered?: boolean;
  resizeEnabled?: boolean;
  displayMode?: "always" | "visible";
  isGradientBox?: boolean;
  gradientColor?: GradientBoxProps["color"];
  defaultExpanded?: boolean;
  previewHeight?: string | number;
  overflow?: "auto" | "visible" | "hidden";
}

export const CodeDemo: React.FC<CodeDemoProps> = ({
  files = {},
  title,
  showEditor = true,
  showPreview = true,
  asIframe = false,
  resizeEnabled = true,
  showSandpackPreview = false,
  isPreviewCentered = false,
  showOpenInCodeSandbox,
  isGradientBox = false,
  defaultExpanded = false,
  previewHeight = "auto",
  overflow = "visible",
  displayMode = "always",
  showTabs = true,
  gradientColor,
  highlightedLines,
  iframeInitialWidth,
  iframeSrc,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "100px",
  });

  const {noInline, code} = useCodeDemo({
    files,
  });

  const renderContent = useCallback(
    (content: React.ReactNode) => {
      if (displayMode === "always") return content;
      if (displayMode === "visible") {
        if (!isInView) {
          return <div style={{height: previewHeight}} />;
        }

        return content;
      }
    },
    [displayMode, previewHeight, isInView],
  );

  const previewContent = useMemo(() => {
    if (!showPreview) return null;

    const content = asIframe ? (
      <WindowResizer
        iframeHeight={previewHeight}
        iframeInitialWidth={iframeInitialWidth}
        iframeSrc={iframeSrc}
        iframeTitle={title}
        resizeEnabled={resizeEnabled}
      />
    ) : (
      <DynamicReactLiveDemo
        code={code}
        gradientColor={gradientColor}
        isCentered={isPreviewCentered}
        isGradientBox={isGradientBox}
        noInline={noInline}
        overflow={overflow}
      />
    );

    return renderContent(content);
  }, [displayMode, previewHeight, asIframe, showPreview, isInView]);

  const editorContent = useMemo(() => {
    if (!showEditor) return null;

    const content = (
      <DynamicSandpack
        defaultExpanded={defaultExpanded}
        files={files}
        highlightedLines={highlightedLines}
        showEditor={showEditor}
        showOpenInCodeSandbox={showOpenInCodeSandbox || showPreview}
        showPreview={showSandpackPreview}
      />
    );

    return renderContent(content);
  }, [
    displayMode,
    showEditor,
    isInView,
    files,
    highlightedLines,
    defaultExpanded,
    showPreview,
    showSandpackPreview,
    showOpenInCodeSandbox,
  ]);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      {showTabs && showPreview ? (
        <Tabs
          disableAnimation
          aria-label="Code demo tabs"
          classNames={{
            panel: "pt-0",
          }}
          variant="underlined"
        >
          <Tab key="preview" title="Preview">
            {previewContent}
          </Tab>
          <Tab key="code" title="Code">
            {editorContent}
          </Tab>
        </Tabs>
      ) : (
        <>
          {previewContent}
          {editorContent}
        </>
      )}
    </div>
  );
};
