import React from 'react';
import useTheme from '../use-theme';
import flush from 'styled-jsx/server';
import flushToReact from 'styled-jsx/server';
import { addColorAlpha } from '../utils/color';

const CssBaseline: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const theme = useTheme();
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
        html,
        body {
          background-color: ${theme.palette.background};
          color: ${theme.palette.text};
        }
        html {
          font-size: ${theme.fontSizes.base};
        }
        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          position: relative;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          font-size: ${theme.fontSizes.base};
          line-height: ${theme.lineHeights.md};
          font-family: ${theme.fonts.sans};
        }
        *,
        *:before,
        *:after {
          box-sizing: border-box;
          text-rendering: geometricPrecision;
          -webkit-tap-highlight-color: transparent;
        }
        p,
        small {
          color: inherit;
          letter-spacing: -0.005625rem;
          font-weight: ${theme.fontWeights.normal};
          font-family: ${theme.fonts.sans};
        }
        p {
          margin: ${theme.spacing.md} 0;
          font-size: ${theme.fontSizes.base};
          line-height: ${theme.lineHeights.lg};
        }
        small {
          margin: 0;
          line-height: ${theme.lineHeights.md};
          font-size: ${theme.fontSizes.xs};
        }
        b {
          font-weight: ${theme.fontWeights.semibold};
        }
        span {
          font-size: inherit;
          color: inherit;
          font-weight: inherit;
        }
        img {
          max-width: 100%;
        }
        a {
          cursor: pointer;
          font-size: inherit;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-box-align: center;
          align-items: center;
          color: ${theme.palette.link};
          text-decoration: none;
        }
        a:hover {
          text-decoration: none;
        }
        ul,
        ol {
          padding: 0;
          list-style-type: none;
          margin: ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm}
            ${theme.spacing.lg};
          color: ${theme.palette.foreground};
        }
        ol {
          list-style-type: decimal;
        }
        li {
          margin-bottom: ${theme.spacing['2.5']};
          font-size: ${theme.fontSizes.base};
          line-height: ${theme.lineHeights.lg};
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: inherit;
          margin: 0 0 0.625rem 0;
        }
        h1 {
          letter-spacing: -0.066875rem;
          line-height: ${theme.lineHeights.md};
          font-size: ${theme.fontSizes.xl};
          font-weight: ${theme.fontWeights.bold};
        }
        h2 {
          letter-spacing: -0.020625rem;
          font-size: ${theme.fontSizes.lg};
          font-weight: ${theme.fontWeights.semibold};
        }
        h3 {
          letter-spacing: -0.029375rem;
          font-size: ${theme.fontSizes.md};
          font-weight: ${theme.fontWeights.semibold};
        }
        h4 {
          letter-spacing: -0.020625rem;
          font-size: ${theme.fontSizes.sm};
          font-weight: ${theme.fontWeights.semibold};
        }
        h5 {
          letter-spacing: -0.01125rem;
          font-size: ${theme.fontSizes.base};
          font-weight: ${theme.fontWeights.semibold};
        }
        h6 {
          letter-spacing: -0.005625rem;
          font-size: ${theme.fontSizes.xs};
          font-weight: ${theme.fontWeights.semibold};
        }
        button,
        input,
        select,
        textarea {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          color: inherit;
          margin: 0;
        }
        button:focus,
        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
        }
        code {
          color: ${theme.palette.code};
          padding: calc(calc(${theme.spacing.sm} * 0.5) * 0.5)
            calc(${theme.spacing.sm} * 0.5);
          border-radius: ${theme.radius.sm};
          background-color: ${addColorAlpha(theme.palette.code, 0.2)};
          font-family: ${theme.fonts.mono};
          font-size: ${theme.fontSizes.xs};
          white-space: pre-wrap;
          transition: background-color 0.25s ease;
        }
        code:hover {
          background-color: ${addColorAlpha(theme.palette.code, 0.3)};
        }
        pre {
          overflow: auto;
          white-space: pre;
          text-align: left;
          font-size: ${theme.fontSizes.xs};
          border-radius: ${theme.radius.lg};
          padding: calc(${theme.spacing.lg} * 0.75) ${theme.spacing.lg};
          margin: ${theme.spacing.lg} 0;
          font-family: ${theme.fonts.mono};
          line-height: ${theme.lineHeights.md};
          -webkit-overflow-scrolling: touch;
        }
        pre code {
          color: ${theme.palette.foreground};
          font-size: ${theme.fontSizes.xs};
          line-height: ${theme.lineHeights.sm};
          white-space: pre;
        }
        pre code:before,
        pre code:after {
          display: none;
        }
        pre :global(p) {
          margin: 0;
        }
        pre::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          background: transparent;
        }
        hr {
          border-color: ${theme.palette.accents_2};
        }
        details {
          background-color: ${theme.palette.accents_1};
          border: none;
        }
        details:focus,
        details:hover,
        details:active {
          outline: none;
        }
        summary {
          cursor: pointer;
          user-select: none;
          list-style: none;
          outline: none;
        }
        summary::-webkit-details-marker,
        summary::before {
          display: none;
        }
        summary::-moz-list-bullet {
          font-size: 0;
        }
        summary:focus,
        summary:hover,
        summary:active {
          outline: none;
          list-style: none;
        }
        blockquote {
          padding: calc(0.667 * ${theme.spacing.lg}) ${theme.spacing.lg};
          color: ${theme.palette.accents_5};
          background-color: ${theme.palette.accents_1};
          border-radius: ${theme.radius.lg};
          margin: ${theme.spacing[6]} 0;
        }
        blockquote :global(*:first-child) {
          margin-top: 0;
        }
        blockquote :global(*:last-child) {
          margin-bottom: 0;
        }
        ::selection {
          background-color: ${theme.palette.selection};
          color: ${theme.palette.background};
        }
      `}</style>
    </React.Fragment>
  );
};

type MemoCssBaselineComponent<P = {}> = React.NamedExoticComponent<P> & {
  flush: typeof flushToReact;
};

const MemoCssBaseline = React.memo(CssBaseline) as MemoCssBaselineComponent<
  React.PropsWithChildren<{}>
>;
MemoCssBaseline.flush = flush;

export default MemoCssBaseline;
