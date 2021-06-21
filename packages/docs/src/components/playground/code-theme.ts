import { PrismTheme } from 'prism-react-renderer';
import { NextUIThemes } from '@nextui-org/react';

const makeCodeTheme = (theme: NextUIThemes): PrismTheme => ({
  plain: {
    backgroundColor: theme.palette.accents_1,
    color: theme.palette.text,
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: theme.font.mono,
    fontSize: '.875rem',
    textRendering: 'geometricPrecision',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: theme.palette.accents_6,
        opacity: 0.5,
      },
    },
    {
      types: ['punctuation', 'symbol', 'text'],
      style: {
        color: theme.palette.text,
      },
    },
    {
      types: ['function'],
      style: {
        color: '#61AFEF',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 1,
      },
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: theme.palette.warning,
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: theme.palette.success,
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: '#E06C75',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: theme.palette.warning,
      },
    },
    {
      types: [
        'boolean',
        'string',
        'entity',
        'url',
        'attr-value',
        'keyword',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'placeholder',
        'variable',
      ],
      style: {
        color: theme.palette.success,
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['language-javascript', 'script'],
      style: {
        color: theme.palette.success,
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#c678dd',
      },
    },
  ],
});

export default makeCodeTheme;
