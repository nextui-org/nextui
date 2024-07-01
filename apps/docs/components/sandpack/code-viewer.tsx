import type {SandpackInitMode} from "@codesandbox/sandpack-react";

import * as React from "react";
import {FileTabs, useSandpack, useActiveCode, SandpackStack} from "@codesandbox/sandpack-react";
import {Language} from "prism-react-renderer";

import {HighlightedLines} from "./types";
import {Decorators} from "./types";

import {Codeblock} from "@/components/docs/components";

export interface CodeViewerProps {
  showTabs?: boolean;
  showLineNumbers?: boolean;
  /**
   * Provides a way to draw or style a piece of the content.
   */
  decorators?: Decorators;
  code?: string;
  highlightedLines?: HighlightedLines;
  wrapContent?: boolean;
  defaultExpanded?: boolean;
  /**
   * This provides a way to control how some components are going to
   * be initialized on the page. The CodeEditor and the Preview components
   * are quite expensive and might overload the memory usage, so this gives
   * a certain control of when to initialize them.
   */
  initMode?: SandpackInitMode;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const SandpackCodeViewer = React.forwardRef<any, CodeViewerProps>(
  ({showTabs, code: propCode, highlightedLines, containerRef}, ref) => {
    const {sandpack} = useSandpack();
    const {code} = useActiveCode();

    const {activeFile} = sandpack;

    // const id = React.useId();
    // hack to make sure we re-render the code editor and change current file
    // TODO: open an issue on sandpack-react
    // const [internalKey, setInternalKey] = React.useState(() => id);

    const shouldShowTabs = showTabs ?? sandpack.visibleFilesFromProps.length > 1;

    const fileExt = activeFile.split(".").pop() as Language;

    // const isAppFile = activeFile.includes("App");

    // React.useEffect(() => {
    //   setInternalKey(getId());
    // }, [propCode, code]);

    React.useEffect(() => {
      if (containerRef && containerRef.current !== null) {
        const container = containerRef.current;

        container.style.height = "auto";
      }
    }, []);

    return (
      <>
        <div className="h-full">
          <SandpackStack>
            {shouldShowTabs ? <FileTabs /> : null}
            <div className="sp-code-viewer max-h-[600px] overflow-y-scroll">
              {/*
               * Disabled in favor of Codeblock due to performance issues & font size on ios 
               *   
              <CodeEditor
                key={internalKey}
                ref={ref}
                readOnly
                code={propCode || code}
                decorators={isAppFile ? decorators : []}
                filePath={activeFile}
                initMode={initMode || sandpack.initMode}
                showLineNumbers={showLineNumbers}
                showReadOnly={false}
                wrapContent={wrapContent}
              /> */}
              <Codeblock
                ref={ref}
                className="pb-2"
                codeString={propCode || code}
                language={fileExt}
                metastring={highlightedLines && `{${highlightedLines}}`}
              />
            </div>
          </SandpackStack>
        </div>
      </>
    );
  },
);

SandpackCodeViewer.displayName = "SandpackCodeViewer";

export default SandpackCodeViewer;
