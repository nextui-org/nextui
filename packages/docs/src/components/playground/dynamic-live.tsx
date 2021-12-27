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
  initialEditorOpen?: boolean;
  overflow?: 'auto' | 'visible' | 'hidden';
}

const defaultProps = {
  showEditor: true
};

const DynamicLive: React.FC<Props> = ({
  code,
  showEditor,
  initialEditorOpen,
  overflow
}) => {
  const themeObject = useTheme();
  const { theme } = themeObject;
  const codeTheme = makeCodeTheme(themeObject);
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
      <div className="wrapper">
        <LivePreview />
        <LiveError />
      </div>
      {showEditor && <Editor initialOpen={initialEditorOpen} />}
      <style jsx>{`
        .wrapper {
          width: 100%;
          padding: ${theme?.space?.lg?.value} ${theme?.space?.sm?.value};
          margin-left: -${theme?.space?.sm?.value};
          display: flex;
          flex-wrap: wrap;
          overflow-x: ${overflow};
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
