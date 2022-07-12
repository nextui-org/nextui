import type {SandpackInitMode} from "@codesandbox/sandpack-react";

import * as React from "react";
import {
  FileTabs,
  CodeEditor,
  useSandpack,
  useActiveCode,
  SandpackStack,
} from "@codesandbox/sandpack-react";
import scrollIntoView from "scroll-into-view-if-needed";
import {getId} from "@utils/collections";
import {Box} from "@primitives";

import {Decorators} from "./types";
import {StyledShoreMoreButton} from "./styles";

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

/**
 * @category Components
 */
const SandpackCodeViewer = React.forwardRef<any, CodeViewerProps>(
  (
    {showTabs, code: propCode, decorators, initMode, showLineNumbers, wrapContent, containerRef},
    ref,
  ) => {
    const {sandpack} = useSandpack();
    const {code} = useActiveCode();

    const {activePath} = sandpack;
    const [isExpanded, setIsExpanded] = React.useState(false);
    // hack to make sure we re-render the code editor and chenge current file
    // TODO: open an issue on sandpack-react
    const [internalKey, setInternalKey] = React.useState(getId());
    const lineCountRef = React.useRef<{[key: string]: number}>({});

    if (!lineCountRef.current[activePath]) {
      lineCountRef.current[activePath] = code.split("\n").length;
    }

    const shouldShowTabs = showTabs ?? sandpack.openPaths.length > 1;

    const lineCount = lineCountRef.current[activePath];
    const isExpandable = lineCount > 12 || isExpanded;

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
      <SandpackStack>
        {shouldShowTabs ? <FileTabs /> : null}
        <CodeEditor
          key={internalKey}
          ref={ref}
          readOnly
          code={propCode || code}
          decorators={decorators}
          filePath={sandpack.activePath}
          initMode={initMode || sandpack.initMode}
          showLineNumbers={showLineNumbers}
          showReadOnly={false}
          wrapContent={wrapContent}
        />
        {isExpandable && (
          <Box css={{py: "$3", pl: "var(--sp-space-4)"}}>
            <StyledShoreMoreButton onClick={handleExpand}>
              {isExpanded ? "Show less" : "Show more"}
            </StyledShoreMoreButton>
          </Box>
        )}
      </SandpackStack>
    );
  },
);

SandpackCodeViewer.displayName = "SandpackCodeViewer";

export default SandpackCodeViewer;
