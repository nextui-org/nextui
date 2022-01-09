import { styled } from '@nextui-org/react';
import makeCodeTheme, { getCodeThemeColors } from '../playground/code-theme';

const codeTheme = makeCodeTheme();
const {
  stringColor,
  functionColor,
  punctuationColor,
  primitiveColor,
  classnameColor
} = getCodeThemeColors();

export const Pre = styled('pre', {
  $$background: codeTheme.plain.backgroundColor,
  $$text: codeTheme.plain.color,
  $$outline: '$shadows$md',
  $$syntax1: functionColor?.style.color,
  $$syntax2: stringColor?.style.color,
  $$syntax3: primitiveColor?.style.color,
  $$syntax4: '$colors$yellow600',
  $$syntax5: classnameColor?.style.color,
  $$syntax6: '$colors$yellow400',
  $$comment: punctuationColor?.style.color,
  $$removed: '$colors$red300',
  $$added: '$colors$green300',
  $$lineNumbers: punctuationColor?.style.color,
  $$fadedLines: punctuationColor?.style.color,
  $$highlightedWord1Bg: '$colors$purple500',
  $$highlightedWord1BgActive: '$colors$purple600',
  $$highlightedWord1Text: '$colors$purple800',
  $$highlightedWord2Bg: '$colors$red100',
  $$highlightedWord2BgActive: '$colors$red500',
  $$highlightedWord2Text: '$colors$red200',
  $$highlightedWord3Bg: '$colors$green300',
  $$highlightedWord3BgActive: '$colors$green500',
  $$highlightedWord3Text: '$colors$green100',

  boxSizing: 'border-box',
  borderRadius: '$lg',
  padding: '$8',
  overflow: 'auto',
  fontFamily: '$mono',
  fontSize: '$xs',
  lineHeight: '21px',
  whiteSpace: 'pre',
  position: 'relative',
  backgroundColor: '$$background',
  color: '$$text',
  boxShadow: '$$outline',
  width: '100%',

  '& > code': {
    color: 'inherit',
    fontSize: 'inherit',
    background: 'inherit',
    display: 'block',
    transition: 'none',
    '&:hover': {
      opacity: 1
    }
  },

  '.token.parameter': {
    color: '$$text'
  },

  '.token.tag, .token.selector, .token.selector .class, .token.function': {
    color: '$$syntax1'
  },

  '.token.script.language-javascript': {
    color: '$$text'
  },

  '.token.class-name': {
    color: '$$syntax5'
  },

  '.token.attr-value, .token.class, .token.string, .token.number, .token.unit, .token.color':
    {
      color: '$$syntax2'
    },

  '.token.keyword, .token.rule, .token.operator, .token.pseudo-class, .token.important':
    {
      color: '$$syntax3'
    },
  '.token.attr-name': {
    color: '$$syntax6'
  },
  '.token.punctuation, .token.module, .token.property': {
    color: '$$syntax4'
  },

  '.token.comment': {
    color: '$$comment'
  },

  '.token.atapply .token:not(.rule):not(.important)': {
    color: 'inherit'
  },

  '.language-shell .token:not(.comment)': {
    color: 'inherit'
  },

  '.language-css .token.function': {
    color: 'inherit'
  },

  '.token.deleted:not(.prefix), .token.inserted:not(.prefix)': {
    display: 'block',
    px: '$4',
    mx: '-20px'
  },

  '.token.deleted:not(.prefix)': {
    color: '$$removed'
  },

  '.token.inserted:not(.prefix)': {
    color: '$$added'
  },

  '.token.deleted.prefix, .token.inserted.prefix': {
    userSelect: 'none'
  },

  // Styles for highlighted word
  '.highlight-word': {
    $$bgAndShadow: '$$highlightedWord1Bg',
    $$xOffset: '1px',
    color: '$$highlightedWord1Text',
    backgroundColor: '$$bgAndShadow',
    display: 'inline-block',
    boxShadow: '$$xOffset 0 0 0 $$bgAndShadow, -$$xOffset 0 0 0 $$bgAndShadow',

    // reset the color for tokens inside highlighted words
    '.token': {
      color: 'inherit'
    },

    '&.on': {
      $$bgAndShadow: '$$highlightedWord1BgActive',
      transition: 'all 100ms ease',
      cursor: 'pointer'
    }
  },

  '.token.deleted .highlight-word': {
    $$bgAndShadow: '$$highlightedWord2Bg',
    color: '$$highlightedWord2Text',

    '&.on': {
      $$bgAndShadow: '$$highlightedWord2BgActive'
    }
  },

  '.token.inserted .highlight-word': {
    $$bgAndShadow: '$$highlightedWord3Bg',
    color: '$$highlightedWord3Text',

    '&.on': {
      $$bgAndShadow: '$$highlightedWord3BgActive'
    }
  },

  // Line numbers
  '&[data-line-numbers=true]': {
    '.highlight-line': {
      position: 'relative',
      paddingLeft: '$9',

      '&::before': {
        content: 'attr(data-line)',
        position: 'absolute',
        left: -5,
        top: 0,
        color: '$$lineNumbers'
      }
    }
  },

  // Styles for highlighted lines
  '.highlight-line': {
    '&, *': {
      transition: 'color 150ms ease'
    },
    '&[data-highlighted=false]': {
      '&, *': {
        color: '$$fadedLines'
      }
    }
  },

  // Typewriter styles
  '.typewriter': {
    opacity: 0
  }
});
