import React from 'react';
import { LivePreview, LiveProvider, LiveError } from 'react-live';
import makeCodeTheme from './code-theme';
import Editor from './editor';
import NextLink from 'next/link';
import { Palette } from '@components';
import * as TemplateComponents from '../templates';
import { useMediaQuery } from '@hooks/use-media-query';
import { validateEmail } from '@utils/index';
import withDefaults from '@utils/with-defaults';
import { Box } from '@components';
import * as Components from '@nextui-org/react';
import * as Icons from '../icons';
import { transformCode } from './utils';

export interface Props {
  code: string;
  showEditor?: boolean;
  initialEditorOpen?: boolean;
  overflow?: 'auto' | 'visible' | 'hidden';
}

const defaultProps = {
  showEditor: true
};

const StyledWrapper = Components.styled(Box, {
  width: '100%',
  padding: '$lg $sm',
  marginLeft: '-$sm',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  background: '$background',
  '& > div': {
    width: '100%'
  },
  variants: {
    overflow: {
      visible: {
        overflowX: 'visible'
      },
      hidden: {
        overflowX: 'hidden'
      },
      auto: {
        overflowX: 'auto'
      }
    },
    noInline: {
      true: {
        px: '$10',
        ml: 0
      }
    }
  },
  defaultVariants: {
    overflow: 'hidden'
  }
});

const DynamicLive: React.FC<Props> = ({
  code,
  showEditor,
  initialEditorOpen,
  overflow
}) => {
  const codeTheme = makeCodeTheme();
  const scope = {
    ...Components,
    ...Icons,
    ...TemplateComponents,
    NextLink,
    Palette,
    useMediaQuery,
    validateEmail
  };

  //transform scope to key text vlaue
  const scopeKeys = Object.keys(scope);
  // convert scopeKeys to string values
  const scopeValues = scopeKeys.map((key) => {
    return { [key]: `${key}` };
  });
  // add 'React' to scopeValues
  scopeValues.push({ React: 'React' });
  // convert scopeValues to object
  const imports = Object.assign({}, ...scopeValues);

  const transformedCode = transformCode(code, imports);
  // check if transformedCode icludes 'const App = () => {'
  const hasApp = transformedCode.includes('const App = () => {');
  const noInline = hasApp;

  return (
    <LiveProvider
      noInline={noInline}
      code={transformedCode}
      scope={scope}
      theme={codeTheme}
    >
      <StyledWrapper
        className="wrapper"
        overflow={overflow}
        noInline={noInline}
      >
        <LivePreview />
        <LiveError />
      </StyledWrapper>
      {showEditor && <Editor initialOpen={initialEditorOpen} code={code} />}
    </LiveProvider>
  );
};

export default withDefaults(DynamicLive, defaultProps);
