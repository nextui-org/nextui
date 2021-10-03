import React from 'react';
import { LivePreview, LiveProvider, LiveError } from 'react-live';
import { useTheme } from '@nextui-org/react';
import makeCodeTheme from './code-theme';
import Editor from './editor';
import NextLink from 'next/link';
import { Palette } from '@components';
import * as TemplateComponents from '../templates';
import { useMediaQuery } from '@hooks/use-media-query';
import { validateEmail } from '@utils/index';
import withDefaults from '@utils/with-defaults';
import * as Components from '@nextui-org/react';
import * as Icons from '../icons';

export interface Props {
  code: string;
  showEditor?: boolean;
}

const defaultProps = {
  showEditor: true,
};

const DynamicLive: React.FC<Props> = ({ code, showEditor }) => {
  const theme = useTheme();
  const codeTheme = makeCodeTheme(theme);
  const scope = {
    ...Components,
    ...Icons,
    ...TemplateComponents,
    NextLink,
    Palette,
    useMediaQuery,
    validateEmail,
  };
  return (
    <LiveProvider code={code} scope={scope} theme={codeTheme}>
      <div className="wrapper">
        <LivePreview />
        <LiveError />
      </div>
      {showEditor && <Editor />}
      <style jsx>{`
        .wrapper {
          width: 100%;
          padding: ${theme.layout.gap} ${theme.layout.gapHalf};
          margin-left: -${theme.layout.gapHalf};
          display: flex;
          flex-wrap: wrap;
          overflow-x: auto;
          flex-direction: column;
          box-sizing: border-box;
        }
        .wrapper > :global(div) {
          width: 100%;
        }
      `}</style>
    </LiveProvider>
  );
};

export default withDefaults(DynamicLive, defaultProps);
