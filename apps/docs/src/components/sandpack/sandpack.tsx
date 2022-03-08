import React from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFiles,
  SandpackPredefinedTemplate,
  SandpackCodeViewer,
  SandpackPreview
} from '@codesandbox/sandpack-react';
import { Grid } from '@nextui-org/react';
import { entry } from './entry';
import { nextuiTheme } from './themes';
import withDefaults from '@utils/with-defaults';
import { getHighlightedLines } from './utils';
import CopyButton from './copy-button';
import CodeSandboxButton from './codesanbox-button';
import BugReportButton from './bugreport-button';
import { Box } from '@primitives';

interface Props {
  files?: SandpackFiles;
  showPreview?: boolean;
  showEditor?: boolean;
  showCopyCode?: boolean;
  showReportBug?: boolean;
  showOpenInCodeSandbox?: boolean;
  template?: SandpackPredefinedTemplate;
  highlightedLines?: string;
}

const defaultProps = {
  files: {},
  showPreview: true,
  showEditor: true,
  showOpenInCodeSandbox: true,
  showReportBug: true,
  showCopyCode: true,
  template: 'react'
};

const Sandpack: React.FC<React.PropsWithChildren<Props>> = ({
  files,
  children,
  highlightedLines,
  showPreview,
  showEditor,
  showReportBug,
  showOpenInCodeSandbox,
  showCopyCode,
  template
}) => {
  const decorators = getHighlightedLines(highlightedLines);

  return (
    <SandpackProvider
      template={template}
      initMode="user-visible"
      customSetup={{
        files: {
          ...files,
          '/index.js': {
            code: entry,
            hidden: true
          }
        },
        entry: '/index.js',
        dependencies: {
          '@nextui-org/react': 'debug'
        }
      }}
    >
      <SandpackLayout
        theme={nextuiTheme}
        style={{
          // @ts-ignore
          '--sp-border-radius': 'var(--nextui-radii-lg)',
          '--sp-colors-fg-inactive': 'var(--nextui-colors-border)'
        }}
      >
        <Grid.Container>
          <Grid xs={12} css={{ height: showPreview ? '350px' : 'auto' }}>
            {showPreview ? <SandpackPreview /> : children}
          </Grid>
          <Grid
            xs={12}
            css={{
              maxHeight: '350px',
              position: 'relative',
              '.playground-buttons': {
                opacity: 0
              },
              '&:hover': {
                '.playground-buttons': {
                  opacity: 1
                }
              }
            }}
          >
            {showEditor && (
              <SandpackCodeViewer showLineNumbers decorators={decorators} />
            )}
            <Box
              className="playground-buttons"
              css={{
                transition: '$default',
                position: 'absolute',
                right: '$4',
                top: '$7',
                d: 'flex',
                jc: 'center',
                ai: 'center'
              }}
            >
              {showReportBug && <BugReportButton />}
              {showCopyCode && <CopyButton />}
              {!showPreview && showOpenInCodeSandbox && <CodeSandboxButton />}
            </Box>
          </Grid>
        </Grid.Container>
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default withDefaults(Sandpack, defaultProps);
