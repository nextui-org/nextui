"use client";

import React, {useCallback, useMemo, useRef} from "react";
import dynamic from "next/dynamic";
import {Skeleton, Tab, Tabs} from "@nextui-org/react";
import {motion, useInView} from "framer-motion";

import {useCodeDemo, UseCodeDemoProps} from "./use-code-demo";

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

interface CodeDemoProps extends UseCodeDemoProps {
  title?: string;
  component?: string;
  showSandpackPreview?: boolean;
  initialEditorOpen?: boolean;
  enableResize?: boolean;
  showTabs?: boolean;
  showPreview?: boolean;
  showOpenInCodeSandbox?: boolean;
  displayMode?: "always" | "visible";
  defaultExpanded?: boolean;
  showWindowActions?: boolean;
  iframeSrc?: string;
  asIframe?: boolean;
  iframeInitialWidth?: number;
  previewHeight?: string | number;
  overflow?: "auto" | "visible" | "hidden";
}

export const CodeDemo: React.FC<CodeDemoProps> = ({
  files = {},
  component,
  showEditor = true,
  showPreview = true,
  asIframe = false,
  showSandpackPreview = false,
  showOpenInCodeSandbox,
  showWindowActions = false,
  enableResize = false,
  defaultExpanded = false,
  previewHeight = "auto",
  overflow = "visible",
  displayMode = "always",
  showTabs = true,
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
        return (
          <motion.div
            animate={isInView ? "visible" : "hidden"}
            initial={false}
            variants={{
              visible: {opacity: 1},
              hidden: {opacity: 0},
            }}
          >
            {content}
          </motion.div>
        );
      }
    },
    [displayMode, isInView],
  );

  const previewContent = useMemo(() => {
    if (!showPreview) return null;

    const content = (
      <DynamicReactLiveDemo
        code={code}
        enableResize={enableResize || asIframe}
        height={previewHeight}
        iframeInitialWidth={iframeInitialWidth}
        iframeSrc={iframeSrc}
        iframeTitle={component}
        noInline={noInline}
        overflow={overflow}
        showWindowActions={showWindowActions || asIframe}
      />
    );

    return renderContent(content);
  }, [displayMode, showPreview, isInView]);

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
