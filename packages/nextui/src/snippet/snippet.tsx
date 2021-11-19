import React, { useMemo, useState, useRef } from 'react';
import Tooltip from '../tooltip';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles, getFocusStyles } from '../utils/styles';
import { SnippetTypes, CopyTypes, TooltipColors } from '../utils/prop-types';
import { getStyles } from './styles';
import SnippetIcon from './snippet-icon';
import useClipboard from '../use-clipboard';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

interface Props extends DefaultProps {
  text?: string | string[];
  symbol?: string;
  filled?: boolean;
  width?: string;
  bordered?: boolean;
  showTooltip?: boolean;
  tooltipCopyText?: string;
  tooltipCopiedText?: string;
  copy?: CopyTypes;
  type?: SnippetTypes;
  tooltipColor?: TooltipColors | string;
  className?: string;
}

const defaultProps = {
  filled: false,
  bordered: false,
  showTooltip: true,
  symbol: '$',
  width: 'initial',
  copy: 'default' as CopyTypes,
  type: 'default' as SnippetTypes,
  tooltipColor: 'default' as TooltipColors | string,
  tooltipCopyText: 'Copy',
  tooltipCopiedText: 'Copied',
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type SnippetProps = Props & typeof defaultProps & NativeAttrs;

const textArrayToString = (text: string[]): string => {
  return text.reduce((pre, current) => {
    if (!current) return pre;
    return pre ? `${pre}\n${current}` : current;
  }, '');
};

const preClass = 'nextui-snippet';

const Snippet: React.FC<React.PropsWithChildren<SnippetProps>> = ({
  type,
  filled,
  bordered,
  children,
  symbol,
  showTooltip,
  text,
  width,
  tooltipCopyText,
  tooltipCopiedText,
  tooltipColor,
  copy: copyType,
  className,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const theme = useTheme();
  const { copy } = useClipboard();
  const ref = useRef<HTMLPreElement>(null);
  const isMultiLine = text && Array.isArray(text);

  const { stringCss } = getSpacingsStyles(theme, props);

  const { className: focusClassName, styles: focusStyles } =
    getFocusStyles(theme);

  const style = useMemo(
    () => getStyles(type, theme.palette, filled),
    [type, theme.palette, filled]
  );
  const showCopyIcon = useMemo(() => copyType !== 'prevent', [copyType]);
  const childText = useMemo<string | undefined | null>(() => {
    if (isMultiLine) return textArrayToString(text as string[]);
    if (!children) return text as string;
    if (!ref.current) return '';
    return ref.current.textContent;
  }, [ref.current, children, text]);

  const snippetWidth = useMemo(() => {
    return showCopyIcon ? `calc(100% - 2 * ${theme.spacing.lg})` : '100%';
  }, [showCopyIcon]);

  const symbolBefore = useMemo(() => {
    const str = symbol.trim();
    return str ? `${str} ` : '';
  }, [symbol]);

  const clickHandler = () => {
    if (!childText || !showCopyIcon) return;
    copy(childText);
    if (copyType === 'slient') return;
    setCopied(true);
  };
  const handleTooltipVisibleChange = () => {
    setTimeout(() => {
      setCopied(false);
    }, 200);
  };

  return (
    <div className={clsx(preClass, className)} {...props}>
      {isMultiLine ? (
        (text as string[]).map((t, index) => (
          <pre className={`${preClass}-pre`} key={`${preClass}-${index}-${t}`}>
            {t}
          </pre>
        ))
      ) : (
        <pre className={`${preClass}-pre`} ref={ref}>
          {children || text}
        </pre>
      )}
      {showCopyIcon && copyType !== 'slient' ? (
        <Tooltip
          hideArrow
          rounded
          color={tooltipColor}
          content={copied ? tooltipCopiedText : tooltipCopyText}
          onVisibleChange={handleTooltipVisibleChange}
        >
          <button
            className={clsx(`${preClass}-copy-button`, focusClassName)}
            onClick={clickHandler}
          >
            <SnippetIcon fill={theme.palette.accents_6} />
          </button>
        </Tooltip>
      ) : (
        copyType !== 'prevent' && (
          <button className={`${preClass}-copy-button`} onClick={clickHandler}>
            <SnippetIcon fill={theme.palette.accents_6} />
          </button>
        )
      )}
      <style jsx>{`
        .${preClass} {
          display: flex;
          position: relative;
          width: ${width};
          max-width: 100%;
          padding: calc(${theme.spacing.lg} * 0.75) ${theme.spacing.lg};
          color: ${style.color};
          background: ${style.bgColor};
          border: ${bordered ? '1px' : '0px'} solid ${style.border};
          border-radius: ${theme.radius.lg};
          ${stringCss};
        }
        .${preClass}-pre {
          margin: 0;
          padding: 0;
          border: none;
          border-radius: 0;
          width: ${snippetWidth};
          background-color: transparent;
          color: ${style.color};
          font-size: 0.8125rem;
        }
        .${preClass}-pre::before {
          content: '${symbolBefore}';
          user-select: none;
        }
        .${preClass}-pre :global(*) {
          margin: 0;
          padding: 0;
          font-size: inherit;
          color: inherit;
        }
        .${preClass}-copy-button {
          display: inline-flex;
          justify-content: center;
          border: none;
          align-items: flex-start;
          background-color: transparent;
          width: calc(2 * ${theme.spacing.lg});
          border-radius: ${theme.radius.xs};
          color: inherit;
          transition: opacity 0.2s ease 0s;
          cursor: pointer;
          user-select: none;
        }
        .${preClass}-copy-button:hover {
          opacity: 0.7;
        }
      `}</style>
      {focusStyles}
    </div>
  );
};

if (__DEV__) {
  Snippet.displayName = 'NextUI - Snippet';
}

const MemoSnippet = React.memo(Snippet);

export default withDefaults(MemoSnippet, defaultProps);
