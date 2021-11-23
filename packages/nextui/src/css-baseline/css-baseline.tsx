import React from 'react';
import { addColorAlpha } from '../utils/color';
import { theme, globalCss, getCssText } from '../theme/stitches.config';

const globalStyles = globalCss({
  '*, *:before, *:after': {
    boxSizing: 'border-box',
    textRendering: 'geometricPrecision',
    WebkitTapHighlightColor: 'transparent'
  },
  html: {
    fontSize: '$base'
  },
  body: {
    margin: 0,
    padding: 0,
    minHeight: '100%',
    position: 'relative',
    overflowX: 'hidden',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
    fontSize: '$base',
    lineHeight: '$md',
    fontFamily: '$sans'
  },
  'html, body': {
    backgroundColor: '$background',
    color: '$text'
  },
  'p, small': {
    color: 'inherit',
    letterSpacing: '$tighter',
    fontWeight: '$normal',
    fontFamily: '$sans'
  },
  p: {
    margin: '$md 0',
    fontSize: '$base',
    lineHeight: '$lg'
  },
  small: {
    margin: 0,
    lineHeight: '$md',
    fontSize: '$xs'
  },
  b: {
    fontWeight: '$semibold'
  },
  span: {
    fontSize: 'inherit',
    color: 'inherit',
    fontWeight: 'inherit'
  },
  img: {
    maxWidth: '100%'
  },
  a: {
    cursor: 'pointer',
    fontSize: 'inherit',
    WebkitTouchCallout: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    color: '$link',
    textDecoration: 'none'
  },
  'a:hover': {
    textDecoration: 'none'
  },
  'ul,ol': {
    padding: 0,
    listStyleType: 'none',
    margin: '$sm $sm $sm $lg',
    color: '$foreground'
  },
  ol: {
    listStyleType: 'decimal'
  },
  li: {
    marginBottom: '$5',
    fontSize: '$base',
    lineHeight: '$lg'
  },
  'h1,h2,h3,h4,h5,h6': {
    color: 'inherit',
    margin: '0 0 $5 0'
  },
  h1: {
    letterSpacing: '$tighter',
    lineHeight: '$md',
    fontSize: '$xl',
    fontWeight: '$bold'
  },
  h2: {
    letterSpacing: '$tighter',
    fontSize: '$lg',
    fontWeight: '$semibold'
  },
  h3: {
    letterSpacing: '$tighter',
    fontSize: '$md',
    fontWeight: '$semibold'
  },
  h4: {
    letterSpacing: '$tighter',
    fontSize: '$sm',
    fontWeight: '$semibold'
  },
  h5: {
    letterSpacing: '$tight',
    fontSize: '$base',
    fontWeight: '$semibold'
  },
  h6: {
    letterSpacing: '$tight',
    fontSize: '$xs',
    fontWeight: '$semibold'
  },
  'button, input, select,textarea': {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
    margin: 0
  },
  'button:focus, input:focus, select:focus,textarea:focus': {
    outline: 'none'
  },
  code: {
    color: '$code',
    padding: '$1 $2',
    borderRadius: '$sm',
    backgroundColor: addColorAlpha(theme.colors.code.value, 0.2),
    fontFamily: '$mono',
    fontSize: '$xs',
    whiteSpace: 'pre-wrap',
    transition: '$default'
  },
  'code:hover': {
    backgroundColor: addColorAlpha(theme.colors.code.value, 0.3)
  },
  pre: {
    overflow: 'auto',
    whiteSpace: 'pre',
    textAlign: 'left',
    fontSize: '$xs',
    borderRadius: '$lg',
    padding: '$md $lg',
    margin: '$lg 0 ',
    fontFamily: '$mono',
    lineHeight: '$md',
    webkitOverflowScrolling: 'touch'
  },
  'pre code': {
    color: '$foreground',
    fontSize: '$xs',
    lineHeight: '$sm',
    whiteSpace: 'pre'
  },
  'pre code:before,pre code:after': {
    display: 'none'
  },
  'pre p': {
    margin: 0
  },
  'pre::-webkit-scrollbar': {
    display: 'none',
    width: 0,
    height: 0,
    background: 'transparent'
  },
  hr: {
    borderColor: '$accents2'
  },
  details: {
    backgroundColor: '$accents1',
    border: 'none'
  },
  'details:focus, details:hover, details:active': {
    outline: 'none'
  },
  summary: {
    cursor: 'pointer',
    userSelect: 'none',
    listStyle: 'none',
    outline: 'none'
  },
  'summary::-webkit-details-marker, summary::before': {
    display: 'none'
  },
  'summary::-moz-list-bullet': {
    fontSize: 0
  },
  'summary:focus, summary:hover, summary:active': {
    outline: 'none',
    listStyle: 'none'
  },
  '::selection': {
    backgroundColor: '$selection'
  },
  blockquote: {
    padding: '$md $lg',
    color: '$accents5',
    backgroundColor: '$accents1',
    borderRadius: '$lg',
    margin: '$10 0'
  },
  'blockquote *:first-child': {
    marginTop: 0
  },
  'blockquote *:last-child': {
    marginBottom: 0
  }
});

const CssBaseline: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  globalStyles();
  return (
    <React.Fragment>
      {children}
      <style global jsx>{`
        :root {
          /* Fonts family */
          --nextui-fonts-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI',
            'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          --nextui-fonts-mono: Menlo, Monaco, 'Lucida Console',
            'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
            'Courier New', monospace;
          /* Font sizes */
          --nextui-font-size-xs: 0.875rem;
          --nextui-font-size-base: 1rem;
          --nextui-font-size-sm: 1.25rem;
          --nextui-font-size-md: 1.5rem;
          --nextui-font-size-lg: 2.25rem;
          --nextui-font-size-xl: 3rem;
          /* Font weights */
          --nextui-fontWeights-thin: 200;
          --nextui-fontWeights-light: 300;
          --nextui-fontWeights-normal: 400;
          --nextui-fontWeights-medium: 500;
          --nextui-fontWeights-semibold: 600;
          --nextui-fontWeights-bold: 700;
          --nextui-fontWeights-extrabold: 800;
          --nextui-fontWeights-black: 900;
          /* Line heights */
          --nextui-line-height-xs: 1;
          --nextui-line-height-sm: 1.25;
          --nextui-line-height-md: 1.5;
          --nextui-line-height-lg: 1.625;
          --nextui-line-height-xl: 1.75;
          /* Radius */
          --nextui-radius-xs: 2px;
          --nextui-radius-sm: 6px;
          --nextui-radius-md: 10px;
          --nextui-radius-lg: 14px;
          --nextui-radius-xl: 28px;
          /* Border weights */
          --nextui-border-light: 1px;
          --nextui-border-normal: 2px;
          --nextui-border-bold: 3px;
          /* Default Colors */
          --nextui-color-white: #fff;
          --nextui-color-black: #000;
          --nextui-color-primary: #0070f3;
          --nextui-color-secondary: #7928ca;
          --nextui-color-success: #17c964;
          --nextui-color-warning: #f5a623;
          --nextui-color-error: #f21361;
          --nextui-color-gradient: linear-gradient(
            111.19deg,
            #aaffec -63.59%,
            #ff4ecd -20.3%,
            #0070f3 70.46%
          );
          --nextui-color-link: #0070f3;
          /* Spacings */
          --nextui-spacing-0: 0rem;
          --nextui-spacing-xs: 0.5rem;
          --nextui-spacing-sm: 0.75rem;
          --nextui-spacing-md: 1rem;
          --nextui-spacing-lg: 1.25rem;
          --nextui-spacing-xl: 2.25rem;
          --nextui-spacing-px: 1px;
          --nextui-spacing-0\\.5: 0.125rem;
          --nextui-spacing-1: 0.25rem;
          --nextui-spacing-1\\.5: 0.375rem;
          --nextui-spacing-2: 0.5rem;
          --nextui-spacing-2\\.5: 0.625rem;
          --nextui-spacing-3: 0.75rem;
          --nextui-spacing-3\\.5: 0.875rem;
          --nextui-spacing-4: 1rem;
          --nextui-spacing-5: 1.25rem;
          --nextui-spacing-6: 1.5rem;
          --nextui-spacing-7: 1.75rem;
          --nextui-spacing-8: 2rem;
          --nextui-spacing-9: 2.25rem;
          --nextui-spacing-10: 2.5rem;
          --nextui-spacing-11: 2.75rem;
          --nextui-spacing-12: 3rem;
          --nextui-spacing-14: 3.5rem;
          --nextui-spacing-16: 4rem;
          --nextui-spacing-20: 5rem;
          --nextui-spacing-24: 6rem;
          --nextui-spacing-28: 7rem;
          --nextui-spacing-32: 8rem;
          --nextui-spacing-36: 9rem;
          --nextui-spacing-40: 10rem;
          --nextui-spacing-44: 11rem;
          --nextui-spacing-48: 12rem;
          --nextui-spacing-52: 13rem;
          --nextui-spacing-56: 14rem;
          --nextui-spacing-60: 15rem;
          --nextui-spacing-64: 16rem;
          --nextui-spacing-72: 18rem;
          --nextui-spacing-80: 20rem;
          --nextui-spacing-96: 24rem;
        }
        body[data-theme='nextui-light'],
        body[data-theme='light'],
        [data-theme='nextui-light'],
        [data-theme='light'] {
          /*  Colors */
          --nextui-color-accents-1: #f6f6f6;
          --nextui-color-accents-2: #eaeaea;
          --nextui-color-accents-3: #999;
          --nextui-color-accents-4: #888;
          --nextui-color-accents-5: #666;
          --nextui-color-accents-6: #444;
          --nextui-color-accents-7: #333;
          --nextui-color-accents-8: #111;
          --nextui-color-text: #333;
          --nextui-color-background: #fff;
          --nextui-color-foreground: #000;
          --nextui-color-code: #f81ce5;
          --nextui-color-border: #eaeaea;
          --nextui-color-selection: #0070f3;
          /* Shadows */
          --nextui-shadow-xs: 0 2px 10px -3px rgba(0, 0, 0, 0.1);
          --nextui-shadow-sm: 0 5px 20px -5px rgba(0, 0, 0, 0.1);
          --nextui-shadow-md: 0 8px 30px rgba(0, 0, 0, 0.15);
          --nextui-shadow-lg: 0 30px 60px rgba(0, 0, 0, 0.15);
          --nextui-shadow-xl: 0 40px 80px rgba(0, 0, 0, 0.25);
        }
        body[data-theme='nextui-dark'],
        body[data-theme='dark'],
        [data-theme='nextui-dark'],
        [data-theme='dark'] {
          /*  Colors */
          --nextui-color-accents-1: #111;
          --nextui-color-accents-2: #333;
          --nextui-color-accents-3: #444;
          --nextui-color-accents-4: #666;
          --nextui-color-accents-5: #888;
          --nextui-color-accents-6: #999;
          --nextui-color-accents-7: #eaeaea;
          --nextui-color-accents-8: #fafafa;
          --nextui-color-text: #fff;
          --nextui-color-background: #000;
          --nextui-color-foreground: #fff;
          --nextui-color-code: #77c8e6;
          --nextui-color-border: #333;
          --nextui-color-selection: #ff4ecd;
          /* Shadows */
          --nextui-shadow-xs: 0 2px 10px -3px rgba(20, 20, 20, 0.1);
          --nextui-shadow-sm: 0 5px 20px -5px rgba(20, 20, 20, 0.1);
          --nextui-shadow-md: 0 8px 30px rgba(20, 20, 20, 0.15);
          --nextui-shadow-lg: 0 30px 60px rgba(20, 20, 20, 0.15);
          --nextui-shadow-xl: 0 40px 80px rgba(20, 20, 20, 0.25);
        }
      `}</style>
    </React.Fragment>
  );
};

type MemoCssBaselineComponent<P = {}> = React.NamedExoticComponent<P> & {
  flush: typeof getCssText;
};

const MemoCssBaseline = React.memo(CssBaseline) as MemoCssBaselineComponent<
  React.PropsWithChildren<{}>
>;
MemoCssBaseline.flush = getCssText;

export default MemoCssBaseline;
