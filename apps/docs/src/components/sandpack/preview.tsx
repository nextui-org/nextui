import * as React from 'react';
import { useClasser } from '@code-hike/classer';
import cn from 'classnames';
import {
  LoadingOverlay,
  SandpackStack,
  Navigator,
  useSandpack,
  OpenInCodeSandboxButton,
  ErrorOverlay
} from '@codesandbox/sandpack-react';
import {
  ViewportOrientation,
  ViewportSize,
  computeViewportSize,
  generateRandomId
} from './utils';
import { useTheme } from '@nextui-org/react';
import { RefreshButton } from './refresh-button';
import { StyledPreviewIframe } from './sandpack.styles';
import { darkTheme, lightTheme } from '@theme/shared';

export interface PreviewProps {
  customStyle?: React.CSSProperties;
  viewportSize?: ViewportSize;
  viewportOrientation?: ViewportOrientation;
  showNavigator?: boolean;
  showOpenInCodeSandbox?: boolean;
  showRefreshButton?: boolean;
  showSandpackErrorOverlay?: boolean;
}

/**
 * @category Components
 */
export const Preview = ({
  customStyle,
  showNavigator = false,
  showRefreshButton = true,
  showOpenInCodeSandbox = true,
  showSandpackErrorOverlay = true,
  viewportSize = 'auto',
  viewportOrientation = 'portrait'
}: PreviewProps): JSX.Element => {
  const { sandpack, listen } = useSandpack();
  const [iframeComputedHeight, setComputedAutoHeight] =
    React.useState<number | null>(null);
  const {
    status,
    registerBundler,
    unregisterBundler,
    errorScreenRegisteredRef,
    openInCSBRegisteredRef,
    loadingScreenRegisteredRef
  } = sandpack;

  const c = useClasser('sp');
  const clientId = React.useRef<string>(generateRandomId());
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  const { isDark } = useTheme();

  // SandpackPreview immediately registers the custom screens/components so the bundler does not render any of them
  openInCSBRegisteredRef.current = true;
  errorScreenRegisteredRef.current = true;
  loadingScreenRegisteredRef.current = true;

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const iframeElement = iframeRef.current!;
    const clientIdValue = clientId.current;

    registerBundler(iframeElement, clientIdValue);

    const unsubscribe = listen((message) => {
      if (message.type === 'resize') {
        setComputedAutoHeight(message.height);
      }
    }, clientIdValue);

    return (): void => {
      unsubscribe();
      unregisterBundler(clientIdValue);
    };
  }, []);

  React.useEffect(() => {
    const iframeElement = iframeRef.current;
    if (!iframeElement) {
      return;
    }
    // const documentElement =
    //   iframeElement.contentWindow?.document.getElementsByTagName('html');

    // console.log({ documentElement });
    // documentElement?.classList?.toggle(
    //   isDark ? darkTheme.className : lightTheme.className
    // );
    // documentElement?.classList.toggle(`${isDark ? 'dark' : 'light'}-theme`);
    // documentElement?.style?.setProperty(
    //   'color-scheme',
    //   isDark ? 'dark' : 'light'
    // );
  }, [isDark, iframeRef.current]);

  const handleNewURL = (newUrl: string): void => {
    if (!iframeRef.current) {
      return;
    }

    iframeRef.current.src = newUrl;
  };

  const viewportStyle = computeViewportSize(viewportSize, viewportOrientation);

  return (
    <SandpackStack
      customStyle={{
        ...customStyle,
        ...viewportStyle
      }}
    >
      {showNavigator ? (
        <Navigator clientId={clientId.current} onURLChange={handleNewURL} />
      ) : null}

      <div className={c('preview-container')}>
        <StyledPreviewIframe
          ref={iframeRef}
          className={cn(
            'sp-preview-iframe',
            isDark ? darkTheme.className : lightTheme.className
          )}
          style={{
            // set height based on the content only in auto mode
            // and when the computed height was returned by the bundler
            height:
              viewportSize === 'auto' && iframeComputedHeight
                ? iframeComputedHeight
                : undefined
          }}
          title="Sandpack Preview"
        />

        {showSandpackErrorOverlay ? <ErrorOverlay /> : null}

        <div className={c('preview-actions')}>
          {!showNavigator && showRefreshButton && status === 'running' ? (
            <RefreshButton clientId={clientId.current} />
          ) : null}

          {showOpenInCodeSandbox ? <OpenInCodeSandboxButton /> : null}
        </div>

        <LoadingOverlay clientId={clientId.current} />
      </div>
    </SandpackStack>
  );
};
