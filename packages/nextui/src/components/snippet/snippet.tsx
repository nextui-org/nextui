import React, { useMemo, useState, useRef } from 'react';
import { Tooltip } from '../index';
import useTheme from '../../hooks/use-theme';
import withDefaults from '../../utils/with-defaults';
import { SnippetTypes, CopyTypes } from '../../utils/prop-types';
import { getStyles } from './styles';
import SnippetIcon from './snippet-icon';
import useClipboard from '../../hooks/use-clipboard';

interface Props {
  text?: string | string[];
  symbol?: string;
  toastText?: string;
  filled?: boolean;
  width?: string;
  bordered?: boolean;
  showTooltip?: boolean;
  tooltipCopyText?: string;
  tooltipCopiedText?: string;
  copy?: CopyTypes;
  type?: SnippetTypes;
  className?: string;
}

const defaultProps = {
  filled: false,
  bordered: false,
  showTooltip: true,
  symbol: '$',
  toastText: 'Copied to clipboard!',
  width: 'initial',
  copy: 'default' as CopyTypes,
  type: 'default' as SnippetTypes,
  tooltipCopyText: 'Copy',
  tooltipCopiedText: 'Copied',
  className: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type SnippetProps = Props & typeof defaultProps & NativeAttrs;

const textArrayToString = (text: string[]): string => {
  return text.reduce((pre, current) => {
    if (!current) return pre;
    return pre ? `${pre}\n${current}` : current;
  }, '');
};

const Snippet: React.FC<React.PropsWithChildren<SnippetProps>> = ({
  type,
  filled,
  bordered,
  children,
  symbol,
  toastText,
  showTooltip,
  text,
  width,
  tooltipCopyText,
  tooltipCopiedText,
  copy: copyType,
  className,
  ...props
}) => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const { copy } = useClipboard();
  const ref = useRef<HTMLPreElement>(null);
  const isMultiLine = text && Array.isArray(text);

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
    return showCopyIcon ? `calc(100% - 2 * ${theme.layout.gap})` : '100%';
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
    <div className={`snippet ${className}`} {...props}>
      {isMultiLine ? (
        (text as string[]).map((t, index) => (
          <pre key={`snippet-${index}-${t}`}>{t}</pre>
        ))
      ) : (
        <pre ref={ref}>{children || text}</pre>
      )}
      {showCopyIcon && copyType !== 'slient' ? (
        <Tooltip
          hideArrow
          text={copied ? tooltipCopiedText : tooltipCopyText}
          onVisibleChange={handleTooltipVisibleChange}
        >
          <span className="copy" onClick={clickHandler}>
            <SnippetIcon fill={theme.palette.accents_6} />
          </span>
        </Tooltip>
      ) : (
        copyType !== 'prevent' && (
          <span className="copy" onClick={clickHandler}>
            <SnippetIcon fill={theme.palette.accents_6} />
          </span>
        )
      )}
      <style jsx>{`
        .snippet {
          display: flex;
          position: relative;
          width: ${width};
          max-width: 100%;
          padding: calc(${theme.layout.gap} * 0.75) ${theme.layout.gap};
          color: ${style.color};
          background: ${style.bgColor};
          border: ${bordered ? '1px' : '0px'} solid ${style.border};
          border-radius: ${theme.layout.radius};
        }
        pre {
          margin: 0;
          padding: 0;
          border: none;
          border-radius: 0;
          width: ${snippetWidth};
          background-color: transparent;
          color: ${style.color};
          font-size: 0.8125rem;
        }
        pre::before {
          content: '${symbolBefore}';
          user-select: none;
        }
        pre :global(*) {
          margin: 0;
          padding: 0;
          font-size: inherit;
          color: inherit;
        }
        .copy {
          background-color: ${style.bgColor};
          display: inline-flex;
          justify-content: center;
          align-items: flex-start;
          width: calc(2 * ${theme.layout.gap});
          color: inherit;
          transition: opacity 0.2s ease 0s;
          cursor: pointer;
          user-select: none;
        }
        .copy:hover {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

const MemoSnippet = React.memo(Snippet);

export default withDefaults(MemoSnippet, defaultProps);
