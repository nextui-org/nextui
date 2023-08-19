"use client";

import {FC, useRef} from "react";
import {SandpackProvider, SandpackLayout, SandpackPreview} from "@codesandbox/sandpack-react";

import {SandpackCodeViewer} from "./code-viewer";
import {nextuiTheme} from "./theme";
import {UseSandpackProps, useSandpack} from "./use-sandpack";
import {BugReportButton} from "./bugreport-button";
import {CopyButton} from "./copy-button";
import {CodeSandboxButton} from "./codesandbox-button";
import {LanguageSelector} from "./language-selector";

export interface SandpackProps extends UseSandpackProps {
  showTabs?: boolean;
  showPreview?: boolean;
  showEditor?: boolean;
  showCopyCode?: boolean;
  showReportBug?: boolean;
  defaultExpanded?: boolean;
  showOpenInCodeSandbox?: boolean;
  children?: React.ReactNode;
}

export const Sandpack: FC<SandpackProps> = ({
  files: filesProp,
  template,
  highlightedLines,
  typescriptStrict = false,
  showPreview = false,
  showEditor = true,
  defaultExpanded = false,
  showOpenInCodeSandbox = true,
  showReportBug = true,
  showCopyCode = true,
  showTabs,
  children,
}) => {
  const editorContainerRef = useRef(null);

  const {files, decorators, customSetup, sandpackTemplate, hasTypescript, setCurrentTemplate} =
    useSandpack({
      files: filesProp,
      template,
      typescriptStrict,
      highlightedLines,
    });

  return (
    <SandpackProvider
      customSetup={customSetup}
      files={files}
      template={sandpackTemplate}
      theme={nextuiTheme}
    >
      <SandpackLayout
        style={{
          // @ts-ignore
          "--sp-border-radius": "0.5rem",
        }}
      >
        <div className="flex w-full flex-col">
          <div>{showPreview ? <SandpackPreview /> : children}</div>
          <div ref={editorContainerRef} className="group h-auto relative pt-2">
            {showEditor && (
              <SandpackCodeViewer
                containerRef={editorContainerRef}
                decorators={decorators}
                defaultExpanded={defaultExpanded}
                highlightedLines={highlightedLines}
                showTabs={showTabs}
              />
            )}
            <div className="hidden md:flex z-20 opacity-0 group-hover:opacity-100 transition-opacity absolute gap-0 right-2 top-2 items-center justify-center bg-code-background">
              {showReportBug && <BugReportButton />}
              {showCopyCode && <CopyButton />}
              {!showPreview && showOpenInCodeSandbox && <CodeSandboxButton />}
            </div>
            {hasTypescript && sandpackTemplate && (
              <LanguageSelector template={sandpackTemplate} onChange={setCurrentTemplate} />
            )}
          </div>
        </div>
      </SandpackLayout>
    </SandpackProvider>
  );
};
