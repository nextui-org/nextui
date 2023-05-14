import React from "react";
import dynamic from "next/dynamic";
import {Spinner} from "@nextui-org/react";

import {useCodeDemo, UseCodeDemoProps} from "./use-code-demo";

const DynamicReactLive = dynamic(() => import("./react-live").then((m) => m.ReactLive), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => (
    <div>
      <Spinner />
    </div>
  ),
});

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
  showWindowActions = false,
  enableResize = false,
  previewHeight = "auto",
  overflow = "visible",
  highlightedLines,
  iframeInitialWidth,
  iframeSrc,
}) => {
  const {noInline, code} = useCodeDemo({
    files,
  });

  return (
    <div className="flex flex-col gap-4">
      {showPreview && (
        <DynamicReactLive
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
      )}
      <DynamicSandpack
        files={files}
        highlightedLines={highlightedLines}
        showEditor={showEditor}
        showOpenInCodeSandbox={showPreview}
        showPreview={showSandpackPreview}
      />
    </div>
  );
};
