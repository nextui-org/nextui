import { PrismTheme } from 'prism-react-renderer';
import { NextUIThemes } from '@nextui/react';

const makeCodeTheme = (theme: NextUIThemes): PrismTheme => ({
  plain: {
    backgroundColor: '#111',
    color: '#C0C0C0',
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
        color: '#999999',
        opacity: 0.5,
      },
    },
    {
      types: ['punctuation', 'symbol', 'text'],
      style: {
        color: '#C0C0C0',
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
        color: '#E5C07B',
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
        color: '#98C379',
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
        color: '#C678DD',
      },
    },
  ],
});

export default makeCodeTheme;
