import React from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFiles,
  SandpackPredefinedTemplate,
  SandpackCodeViewer,
  SandpackPreview
} from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';
import { Grid } from '@nextui-org/react';
import { darkThemeEntry, lightThemeEntry } from './entry';
import withDefaults from '@utils/with-defaults';
import { getHighlightedLines } from './utils';

interface Props {
  files?: SandpackFiles;
  template?: SandpackPredefinedTemplate;
  highlightedLines?: string;
}

const defaultProps = {
  files: {},
  template: 'react'
};

const Sandpack: React.FC<Props> = ({ files, highlightedLines, template }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const decorators = getHighlightedLines(highlightedLines);

  return (
    <SandpackProvider
      template={template}
      initMode="user-visible"
      initModeObserverOptions={{ rootMargin: '1400px 0px' }}
      customSetup={{
        files: {
          ...files,
          '/index.js': {
            code: isDark ? darkThemeEntry : lightThemeEntry,
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
        theme={isDark ? 'dark' : 'light'}
        style={{
          // @ts-ignore
          '--sp-border-radius': 'var(--nextui-radii-lg)',
          '--sp-colors-fg-inactive': 'var(--nextui-colors-border)'
        }}
      >
        <Grid.Container>
          <Grid xs={12} css={{ height: '350px' }}>
            <SandpackPreview />
          </Grid>
          <Grid xs={12} css={{ maxHeight: '350px' }}>
            <SandpackCodeViewer showLineNumbers decorators={decorators} />
          </Grid>
        </Grid.Container>
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default withDefaults(Sandpack, defaultProps);
