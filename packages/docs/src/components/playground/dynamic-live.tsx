import React from 'react';
import { LivePreview, LiveProvider, LiveError } from 'react-live';
import { useTheme } from '@nextui-org/react';
import makeCodeTheme from './code-theme';
import Editor from './editor';
import NextLink from 'next/link';
import { Palette } from '@components';
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
  const scope = { ...Components, ...Icons, NextLink, Palette };
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
          padding: 0 0 ${theme.layout.gapHalf} 0;
          display: flex;
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
