import React from 'react';
import { LivePreview, LiveProvider, LiveError } from 'react-live';
import { useTheme } from '@nextui/react';
import makeCodeTheme from './code-theme';
import Editor from './editor';
import * as Components from '@nextui/react';

export interface Props {
  code: string;
}

const DynamicLive: React.FC<Props> = ({ code }) => {
  const theme = useTheme();
  const codeTheme = makeCodeTheme(theme);
  const scope = { ...Components };
  return (
    <LiveProvider code={code} scope={scope} theme={codeTheme}>
      <div className="wrapper">
        <LivePreview />
        <LiveError />
      </div>
      <Editor code={code} />
      <style jsx>{`
        .wrapper {
          width: 100%;
          padding: ${theme.layout.pageMargin};
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

export default DynamicLive;
