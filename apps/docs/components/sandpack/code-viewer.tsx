import type {SandpackInitMode} from "@codesandbox/sandpack-react";

import * as React from "react";
import {FileTabs, useSandpack, useActiveCode, SandpackStack} from "@codesandbox/sandpack-react";
import {Button} from "@nextui-org/react";
import scrollIntoView from "scroll-into-view-if-needed";
import {clsx} from "@nextui-org/shared-utils";
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

const INITIAL_HEIGHT = "200px";

export const SandpackCodeViewer = React.forwardRef<any, CodeViewerProps>(
  ({showTabs, code: propCode, defaultExpanded = false, highlightedLines, containerRef}, ref) => {
    const {sandpack} = useSandpack();
    const {code} = useActiveCode();

    const {activeFile} = sandpack;

    const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

    // const id = React.useId();
    // hack to make sure we re-render the code editor and change current file
    // TODO: open an issue on sandpack-react
    // const [internalKey, setInternalKey] = React.useState(() => id);
    const lineCountRef = React.useRef<{[key: string]: number}>({});

    if (!lineCountRef.current[activeFile]) {
      lineCountRef.current[activeFile] = code.split("\n").length;
    }

    const shouldShowTabs = showTabs ?? sandpack.visibleFilesFromProps.length > 1;

    const lineCount = lineCountRef.current[activeFile];
    const isExpandable = lineCount > 7 || isExpanded;
    const fileExt = activeFile.split(".").pop() as Language;

    // const isAppFile = activeFile.includes("App");

    React.useEffect(() => {
      if (containerRef && containerRef?.current !== null && isExpandable) {
        containerRef.current.style.height = INITIAL_HEIGHT;
      }
    }, [containerRef]);

    // React.useEffect(() => {
    //   setInternalKey(getId());
    // }, [propCode, code]);

    React.useEffect(() => {
      if (defaultExpanded && containerRef && containerRef?.current !== null) {
        const container = containerRef?.current;

        container.style.height = "auto";
      }
    }, [defaultExpanded]);

    const handleExpand = () => {
      const nextIsExpanded = !isExpanded;

      setIsExpanded(nextIsExpanded);
      if (containerRef && containerRef?.current !== null) {
        const container = containerRef?.current;

        if (nextIsExpanded) {
          container.style.height = "auto";
        } else {
          container.style.height = INITIAL_HEIGHT;
          scrollIntoView(container, {
            behavior: "smooth",
            scrollMode: "if-needed",
            block: "center",
          });
        }
      }
    };

    return (
      <>
        <div className="h-full">
          <SandpackStack>
            {shouldShowTabs ? <FileTabs /> : null}
            <div
              className={clsx("sp-code-viewer max-h-[600px] overflow-y-scroll", {
                "is-expanded": isExpanded,
              })}
            >
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
                className={isExpandable ? "pb-16" : "pb-2"}
                codeString={propCode || code}
                language={fileExt}
                metastring={highlightedLines && `{${highlightedLines}}`}
              />
            </div>
          </SandpackStack>
        </div>
        {isExpandable && (
          <div
            className={clsx(
              "w-full absolute z-10 py-1 px-4 flex items-center justify-center bg-gradient-to-t from-code-background to-code-background/10 dark:to-code-background/50",
              {"h-10 bottom-0 pb-2": isExpanded},
              {"h-full inset-0": !isExpanded},
            )}
          >
            <Button
              className="bg-[#2a2838] shadow-md font-sans dark:bg-zinc-800 text-zinc-300 dark:text-zinc-400 hover:!text-zinc-200"
              radius="full"
              size="sm"
              variant="flat"
              onClick={handleExpand}
            >
              {isExpanded ? "Show less" : "Show more"}
            </Button>
          </div>
        )}
      </>
    );
  },
);

SandpackCodeViewer.displayName = "SandpackCodeViewer";

export default SandpackCodeViewer;
