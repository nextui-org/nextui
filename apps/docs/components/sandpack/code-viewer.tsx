import type {SandpackInitMode} from "@codesandbox/sandpack-react";

import * as React from "react";
import {
  FileTabs,
  CodeEditor,
  useSandpack,
  useActiveCode,
  SandpackStack,
} from "@codesandbox/sandpack-react";
import {clsx} from "@nextui-org/shared-utils";
import scrollIntoView from "scroll-into-view-if-needed";

import {getId} from "./utils";
import {Decorators} from "./types";

export interface CodeViewerProps {
  showTabs?: boolean;
  showLineNumbers?: boolean;
  /**
   * Provides a way to draw or style a piece of the content.
   */
  decorators?: Decorators;
  code?: string;
  wrapContent?: boolean;
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
  (
    {showTabs, code: propCode, decorators, initMode, showLineNumbers, wrapContent, containerRef},
    ref,
  ) => {
    const {sandpack} = useSandpack();
    const {code} = useActiveCode();

    const {activeFile} = sandpack;
    const [isExpanded, setIsExpanded] = React.useState(false);
    const id = React.useId();
    // hack to make sure we re-render the code editor and change current file
    // TODO: open an issue on sandpack-react
    const [internalKey, setInternalKey] = React.useState(() => id);
    const lineCountRef = React.useRef<{[key: string]: number}>({});

    if (!lineCountRef.current[activeFile]) {
      lineCountRef.current[activeFile] = code.split("\n").length;
    }

    const shouldShowTabs = showTabs ?? sandpack.visibleFilesFromProps.length > 1;

    const lineCount = lineCountRef.current[activeFile];
    const isExpandable = lineCount > 13 || isExpanded;
    const isAppFile = activeFile.includes("App");

    React.useEffect(() => {
      if (containerRef && containerRef?.current !== null && isExpandable) {
        containerRef.current.style.height = "350px";
      }
    }, [containerRef]);

    React.useEffect(() => {
      setInternalKey(getId());
    }, [propCode, code]);

    const handleExpand = () => {
      const nextIsExpanded = !isExpanded;

      setIsExpanded(nextIsExpanded);
      if (containerRef && containerRef?.current !== null) {
        const container = containerRef?.current;

        if (nextIsExpanded) {
          container.style.height = "auto";
        } else {
          container.style.height = "350px";
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
        <div
          className={clsx("overflow-scroll h-full", {
            "pb-10": isExpandable,
          })}
        >
          <SandpackStack>
            {shouldShowTabs ? <FileTabs /> : null}
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
            />
          </SandpackStack>
        </div>
        {isExpandable && (
          <div className="w-full absolute bottom-0 py-1 px-4 flex items-center justify-end bg-gradient-to-b from-code-background/30 to-black/40 dark:to-black h-10">
            <button
              className="text-sm transition-colors text-code-foreground/50 hover:text-code-foreground/80"
              onClick={handleExpand}
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </>
    );
  },
);

SandpackCodeViewer.displayName = "SandpackCodeViewer";

export default SandpackCodeViewer;
