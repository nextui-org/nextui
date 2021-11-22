import * as React from 'react';
import { Snippet, useTheme } from '@nextui-org/react';
import makeCodeTheme from '../playground/code-theme';

const Codeblock: React.FC<React.PropsWithChildren<unknown>> = ({
  children
}) => {
  const theme = useTheme();
  const codeTheme = makeCodeTheme(theme);
  const stringColor = codeTheme.styles.find((style) =>
    style.types.includes('string')
  );
  const punctuationColor = codeTheme.styles.find((style) =>
    style.types.includes('punctuation')
  );
  const numberColor = codeTheme.styles.find((style) =>
    style.types.includes('number')
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
        :global(.nextui-snippet, .nextui-snippet-copy-button) {
          background-color: ${codeTheme.plain.backgroundColor} !important;
        }
        :global(.language-jsx) {
          box-shadow: 0px 5px 20px -5px rgb(0 0 0 / 20%);
        }
        :global(.nextui-snippet-copy-button path) {
          fill: ${theme.type === 'light'
            ? theme.palette.accents_2
            : theme.palette.accents_5};
        }
        :global(.nextui-snippet .nextui-snippet-pre) {
          border-radius: 0px !important;
          color: ${textColor?.style.color} !important;
        }
        :global(.nextui-snippet-pre .token.string) {
          color: ${stringColor?.style.color} !important;
        }
        :global(.nextui-snippet-pre .token.builtin) {
          color: ${classnameColor?.style.color} !important;
        }
        :global(.nextui-snippet-pre .token.punctuation) {
          color: ${punctuationColor?.style.color} !important;
        }
        :global(.nextui-snippet-pre .token.number) {
          color: ${numberColor?.style.color} !important;
        }
        :global(.nextui-snippet-pre .token.class-name) {
          color: ${classnameColor?.style.color} !important;
        }
        :global(.nextui-snippet-pre .token.maybe-class-name) {
          color: ${selectorColor?.style.color} !important;
        }
        :global(.nextui-snippet-pre .token.plain-text, .token.comment) {
          color: ${commentColor?.style.color} !important;
        }
        :global(.nextui-snippet-pre .token.module, .nextui-snippet-pre
            .token.keyword) {
          color: #c678dd !important;
        }
        :global(.nextui-snippet-pre .token.function) {
          color: ${functionColor?.style.color} !important;
        }
      `}</style>
    </Snippet>
  );
};

export default Codeblock;
