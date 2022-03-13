import * as React from 'react';
import {
  FileTabs,
  CodeEditor,
  useSandpack,
  useActiveCode,
  SandpackStack
} from '@codesandbox/sandpack-react';
import type {
  CodeEditorRef,
  SandpackInitMode
} from '@codesandbox/sandpack-react';
import { Decorators } from './types';
import { getId } from '@utils/collections';
import useIsMounted from '@hooks/use-is-mounted';

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
}

/**
 * @category Components
 */
const SandpackCodeViewer = React.forwardRef<CodeEditorRef, CodeViewerProps>(
  (
    {
      showTabs,
      showLineNumbers,
      decorators,
      code: propCode,
      initMode,
      wrapContent
    },
    ref
  ) => {
    const { sandpack } = useSandpack();
    const { code } = useActiveCode();
    const isMounted = useIsMounted();

    const [internalCode, setInternalCode] = React.useState(propCode || code);
    // hack to make sure we re-render the code editor and chenge current file
    // TODO: open an issue on sandpack-react
    const [internalKey, setInternalKey] = React.useState(getId());

    React.useEffect(() => {
      setInternalCode(propCode || code);
      setInternalKey(getId());
    }, [propCode, code]);

    const shouldShowTabs = showTabs ?? sandpack.openPaths.length > 1;

    // to avoid flicker in prod mode
    if (!isMounted) {
      return null;
    }

    return (
      <SandpackStack>
        {shouldShowTabs ? <FileTabs /> : null}
        <CodeEditor
          readOnly
          ref={ref}
          key={internalKey}
          code={internalCode}
          decorators={decorators}
          filePath={sandpack.activePath}
          initMode={initMode || sandpack.initMode}
          showLineNumbers={showLineNumbers}
          showReadOnly={false}
          wrapContent={wrapContent}
        />
      </SandpackStack>
    );
  }
);

SandpackCodeViewer.displayName = 'SandpackCodeViewer';

export default SandpackCodeViewer;
