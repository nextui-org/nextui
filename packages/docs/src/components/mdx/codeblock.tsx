import * as React from 'react';
import { Snippet, useTheme } from '@nextui/react';
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
  const selectorColor = codeTheme.styles.find((style) =>
    style.types.includes('selector')
  );
  const commentColor = codeTheme.styles.find((style) =>
    style.types.includes('comment')
  );
  const classnameColor = codeTheme.styles.find((style) =>
    style.types.includes('tag')
  );
  return (
    <Snippet symbol="">
      {children}
      <style jsx>{`
        :global(pre) {
          border: 0px;
          padding: 4px !important;
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
      `}</style>
    </Snippet>
  );
};

export default Codeblock;
