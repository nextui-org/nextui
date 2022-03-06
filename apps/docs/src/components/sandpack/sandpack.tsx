import React from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFiles,
  SandpackPredefinedTemplate
} from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';
import { Grid } from '@nextui-org/react';
import { lightThemeEntry, darkThemeEntry } from './entry';
import withDefaults from '@utils/with-defaults';

interface Props {
  files?: SandpackFiles;
  template?: SandpackPredefinedTemplate;
}

const defaultProps = {
  files: {},
  template: 'react'
};

const Sandpack: React.FC<Props> = ({ files, template }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <SandpackProvider
      template={template}
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
            <SandpackCodeEditor showLineNumbers showInlineErrors />
          </Grid>
        </Grid.Container>
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default withDefaults(Sandpack, defaultProps);
