import React, { useState, useMemo } from 'react';
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
import { StyledPlaygroundButtons } from './styles';
import LanguageSelector from './language-selector';
import { HighlightedLines, Language } from './types';

interface Props {
  files?: SandpackFiles;
  showPreview?: boolean;
  showEditor?: boolean;
  showCopyCode?: boolean;
  showReportBug?: boolean;
  showOpenInCodeSandbox?: boolean;
  template?: SandpackPredefinedTemplate;
  highlightedLines?: HighlightedLines;
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

export type SandpackProps = Props & typeof defaultProps;

const Sandpack: React.FC<React.PropsWithChildren<SandpackProps>> = ({
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
  const [currentTemplate, setCurrentTemplate] =
    useState<SandpackPredefinedTemplate>(template);

  const hasTypescript = Object.keys(files).some(
    (file) => file.includes('.ts') || file.includes('.tsx')
  );

  const decorators = getHighlightedLines(highlightedLines, currentTemplate);

  const handleLanguageChange = (language: Language) => {
    const newTemplate = language === 'typescript' ? 'react-ts' : 'react';
    if (newTemplate !== currentTemplate) {
      setCurrentTemplate(newTemplate);
    }
  };

  // map current template to its mime type
  const mimeType = useMemo(
    () => (currentTemplate === 'react-ts' ? '.ts' : '.js'),
    [currentTemplate]
  );

  // get entry file by current template
  const entryFile = useMemo(
    () => (currentTemplate === 'react-ts' ? '/index.tsx' : '/index.js'),
    [currentTemplate]
  );

  // filter files by current template
  const filteredFiles = Object.keys(files).reduce((acc, key) => {
    if (key.includes(mimeType)) {
      // @ts-ignore
      acc[key] = files[key];
    }
    return acc;
  }, {});

  return (
    <SandpackProvider
      template={currentTemplate}
      initMode="user-visible"
      initModeObserverOptions={{ rootMargin: '1400px 0px' }}
      customSetup={{
        files: {
          ...filteredFiles,
          [entryFile]: {
            code: entry,
            hidden: true
          }
        },
        entry: entryFile,
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
          '--sp-colors-fg-inactive': 'transparent'
        }}
      >
        <Grid.Container>
          <Grid
            xs={12}
            css={{
              height: showPreview ? '350px' : 'auto'
            }}
          >
            {showPreview ? <SandpackPreview /> : children}
          </Grid>
          <Grid
            xs={12}
            css={{
              height: '350px',
              position: 'relative',
              '.sp-playground-buttons': {
                opacity: 0
              },
              '&:hover': {
                '.sp-playground-buttons': {
                  opacity: 1
                }
              },
              '.sp-stack': {
                background: 'var(--sp-colors-bg-default)',
                borderRadius: '$lg'
              }
            }}
          >
            {showEditor && (
              <SandpackCodeViewer showLineNumbers decorators={decorators} />
            )}
            <StyledPlaygroundButtons className="sp-playground-buttons">
              {showReportBug && <BugReportButton />}
              {showCopyCode && <CopyButton />}
              {!showPreview && showOpenInCodeSandbox && <CodeSandboxButton />}
            </StyledPlaygroundButtons>

            {hasTypescript && (
              <LanguageSelector onChange={handleLanguageChange} />
            )}
          </Grid>
        </Grid.Container>
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default withDefaults(Sandpack, defaultProps);
