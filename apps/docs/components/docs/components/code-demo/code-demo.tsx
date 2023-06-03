import React, {useMemo, useRef} from "react";
import dynamic from "next/dynamic";
import {Spinner} from "@nextui-org/react";
import {useInView} from "framer-motion";

import {useCodeDemo, UseCodeDemoProps} from "./use-code-demo";

const DynamicReactLiveDemo = dynamic(
  () => import("./react-live-demo").then((m) => m.ReactLiveDemo),
  {
    ssr: false,
    // eslint-disable-next-line react/display-name
    loading: () => (
      <div>
        <Spinner />
      </div>
    ),
  },
);

const DynamicSandpack = dynamic(() => import("../../../sandpack").then((m) => m.Sandpack), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => (
    <div>
      <Spinner />
    </div>
  ),
});

interface CodeDemoProps extends UseCodeDemoProps {
  component?: string;
  showSandpackPreview?: boolean;
  initialEditorOpen?: boolean;
  enableResize?: boolean;
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
  highlightedLines,
  iframeInitialWidth,
  iframeSrc,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});

  const {noInline, code} = useCodeDemo({
    files,
  });

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

    if (displayMode === "always") return content;

    if (displayMode === "visible") return isInView ? content : null;
  }, [displayMode, showPreview, isInView]);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {previewContent}
      <DynamicSandpack
        defaultExpanded={defaultExpanded}
        files={files}
        highlightedLines={highlightedLines}
        showEditor={showEditor}
        showOpenInCodeSandbox={showOpenInCodeSandbox || showPreview}
        showPreview={showSandpackPreview}
      />
    </div>
  );
};
