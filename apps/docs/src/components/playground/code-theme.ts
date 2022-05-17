import { PrismTheme } from 'prism-react-renderer';

const makeCodeTheme = (): PrismTheme => ({
  plain: {
    backgroundColor: 'var(--nextui-colors-codeBackground)',
    color: '#F4F4F4',
    fontWeight: '500',
    fontStyle: 'normal',
    fontFamily: '$mono',
    fontSize: '$xs',
    textRendering: 'geometricPrecision'
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: 'var(--nextui-colors-codeComment)',
        opacity: 0.5
      }
    },
    {
      types: ['punctuation', 'symbol', 'text'],
      style: {
        color: '#fff'
      }
    },
    {
      types: ['function'],
      style: {
        color: '#61AFEF'
      }
    },
    {
      types: ['namespace'],
      style: {
        opacity: 1
      }
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: '#E5C07B'
      }
    },
    {
      types: ['property', 'function'],
      style: {
        color: 'var(--nextui-colors-success)'
      }
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: '#E06C75'
      }
    },
    {
      types: ['attr-name'],
      style: {
        color: 'var(--nextui-colors-yellow600)'
      }
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
        'variable'
      ],
      style: {
        color: '#98C379'
      }
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through'
      }
    },
    {
      types: ['language-javascript', 'script'],
      style: {
        color: 'var(--nextui-colors-success)'
      }
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline'
      }
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic'
      }
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold'
      }
    },
    {
      types: ['important', 'primitive'],
      style: {
        color: '#c678dd'
      }
    }
  ]
});

export const getCodeThemeColors = () => {
  const codeTheme = makeCodeTheme();
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
  const primitiveColor = codeTheme.styles.find((style) =>
    style.types.includes('primitive')
  );

  return {
    ...codeTheme.plain,
    stringColor,
    punctuationColor,
    numberColor,
    textColor,
    selectorColor,
    commentColor,
    classnameColor,
    attrColor,
    functionColor,
    primitiveColor
  };
};

export default makeCodeTheme;
