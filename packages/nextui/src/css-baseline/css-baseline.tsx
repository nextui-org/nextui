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
        html,
        body {
          background-color: ${theme.palette.background};
          color: ${theme.palette.text};
        }
        html {
          font-size: 16px;
          --nextui-icons-background: ${theme.palette.background};
        }
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          font-size: 1rem;
          line-height: 1.5;
          margin: 0;
          padding: 0;
          min-height: 100%;
          position: relative;
          overflow-x: hidden;
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
          font-weight: 400;
          color: inherit;
          letter-spacing: -0.005625rem;
          font-family: ${theme.fonts.sans};
        }
        p {
          margin: 1rem 0;
          font-size: 1em;
          line-height: 1.625em;
        }
        small {
          margin: 0;
          line-height: 1.5;
          font-size: 0.875rem;
        }
        b {
          font-weight: 600;
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
          margin-bottom: 0.625rem;
          font-size: 1em;
          line-height: 1.625em;
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
          font-size: ${theme.fontSizes.xl};
          letter-spacing: -0.066875rem;
          line-height: 1.5;
          font-weight: 700;
        }
        h2 {
          font-size: ${theme.fontSizes.lg};
          letter-spacing: -0.020625rem;
          font-weight: 600;
        }
        h3 {
          font-size: ${theme.fontSizes.md};
          letter-spacing: -0.029375rem;
          font-weight: 600;
        }
        h4 {
          font-size: ${theme.fontSizes.sm};
          letter-spacing: -0.020625rem;
          font-weight: 600;
        }
        h5 {
          font-size: ${theme.fontSizes.base};
          letter-spacing: -0.01125rem;
          font-weight: 600;
        }
        h6 {
          font-size: ${theme.fontSizes.xs};
          letter-spacing: -0.005625rem;
          font-weight: 600;
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
          border-radius: 0.375rem;
          background-color: ${addColorAlpha(theme.palette.code, 0.2)};
          font-family: ${theme.fonts.mono};
          font-size: 0.8rem;
          white-space: pre-wrap;
          transition: background-color 0.25s ease;
        }
        code:hover {
          background-color: ${addColorAlpha(theme.palette.code, 0.3)};
        }
        pre {
          border-radius: ${theme.radius.lg};
          padding: calc(${theme.spacing.lg} * 0.75) ${theme.spacing.lg};
          margin: ${theme.spacing.lg} 0;
          font-family: ${theme.fonts.mono};
          white-space: pre;
          overflow: auto;
          line-height: 1.5;
          text-align: left;
          font-size: 0.875rem;
          -webkit-overflow-scrolling: touch;
        }
        pre code {
          color: ${theme.palette.foreground};
          font-size: 0.8125rem;
          line-height: 1.25rem;
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
          margin: 1.5rem 0;
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
