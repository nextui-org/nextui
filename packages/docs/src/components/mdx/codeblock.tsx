import * as React from 'react';
import { Snippet, useTheme } from '@nextui-org/react';
import makeCodeTheme from '../playground/code-theme';

const Codeblock: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const theme = useTheme();
  const codeTheme = makeCodeTheme(theme);
  const stringColor = codeTheme.styles.find((style) =>
    style.types.includes('string')
  );
  const punctuationColor = codeTheme.styles.find((style) =>
    style.types.includes('punctuation')
  );
  const textColor = codeTheme.styles.find((style) =>
    style.types.includes('text')
  );
  const selectorColor = codeTheme.styles.find((style) =>
    style.types.includes('selector')
  );
  const commentColor = codeTheme.styles.find((style) =>
    style.types.includes('comment')
  );
  const classnameColor = codeTheme.styles.find((style) =>
    style.types.includes('tag')
  );
  const functionColor = codeTheme.styles.find((style) =>
    style.types.includes('function')
  );
  return (
    <Snippet symbol="">
      {children}
      <style jsx>{`
        :global(pre) {
          border: 0px;
          padding: 0px !important;
          color: ${textColor?.style.color} !important;
        }
        :global(.snippet, .copy) {
          background-color: ${codeTheme.plain.backgroundColor} !important;
        }
        :global(.token.string) {
          color: ${stringColor?.style.color};
        }
        :global(.token.punctuation) {
          color: ${punctuationColor?.style.color};
        }
        :global(.token.class-name) {
          color: ${classnameColor?.style.color};
        }
        :global(.token.maybe-class-name) {
          color: ${selectorColor?.style.color};
        }
        :global(.token.plain-text, .token.comment) {
          color: ${commentColor?.style.color};
        }
        :global(.token.module, .token.keyword) {
          color: #c678dd;
        }
        :global(.token.function) {
          color: ${functionColor?.style.color};
        }
      `}</style>
    </Snippet>
  );
};

export default Codeblock;
