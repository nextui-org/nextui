import * as React from 'react';
import {
  Snippet,
  StyledSnippetPre,
  globalCss,
  StyledSnippetCopyButton,
  useTheme
} from '@nextui-org/react';
import makeCodeTheme from '../playground/code-theme';

const globalStyles = globalCss({
  pre: {
    border: 0,
    padding: 0
  }
});

const Codeblock: React.FC<React.PropsWithChildren<unknown>> = ({
  children
}) => {
  const themeObj = useTheme();
  const { theme, isDark } = themeObj;
  const codeTheme = makeCodeTheme(themeObj);
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
  const attrColor = codeTheme.styles.find((style) =>
    style.types.includes('attr-name')
  );
  const functionColor = codeTheme.styles.find((style) =>
    style.types.includes('function')
  );

  globalStyles();
  return (
    <Snippet
      css={{
        bg: codeTheme.plain.backgroundColor,
        boxShadow: '0px 5px 20px -5px rgb(0 0 0 / 20%)',
        [`& ${StyledSnippetPre}`]: {
          border: '0px',
          padding: '0px',
          width: '100%',
          color: textColor?.style.color,
          borderRadius: '0px',
          '.token.string': {
            color: stringColor?.style.color
          },
          '.token.builtin': {
            color: classnameColor?.style.color
          },
          '.token.punctuation': {
            color: punctuationColor?.style.color
          },
          '.token.number': {
            color: numberColor?.style.color
          },
          '.token.class-name': {
            color: classnameColor?.style.color
          },
          '.token.comment': {
            color: commentColor?.style.color
          },
          '.token.plain-text': {
            color: textColor?.style.color
          },
          '.token.module, .token.keyword': {
            color: '#c678dd'
          },
          '.token.function': {
            color: functionColor?.style.color
          },
          '.token.tag': {
            color: selectorColor?.style.color
          },
          '.token.attr-name': {
            color: attrColor?.style.color
          },
          '.token.language-javascript': {
            color: numberColor?.style.color
          }
        },
        [`& ${StyledSnippetCopyButton}`]: {
          bg: codeTheme.plain.backgroundColor,
          path: {
            fill: !isDark
              ? theme?.colors?.accents2?.value
              : theme?.colors?.accents5?.value
          }
        }
      }}
      symbol=""
    >
      {children}
    </Snippet>
  );
};

export default Codeblock;
