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
  return (
    <LiveProvider code={code} scope={scope} theme={codeTheme}>
      <StyledWrapper className="wrapper" overflow={overflow}>
        <LivePreview />
        <LiveError />
      </StyledWrapper>
      {showEditor && <Editor initialOpen={initialEditorOpen} />}
    </LiveProvider>
  );
};

export default withDefaults(DynamicLive, defaultProps);
