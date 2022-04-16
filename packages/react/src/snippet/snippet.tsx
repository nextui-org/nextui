import React, { useMemo, useState, useRef } from 'react';
import Tooltip from '../tooltip';
import withDefaults from '../utils/with-defaults';
import { CopyTypes, TooltipColors } from '../utils/prop-types';
import { CSS } from '../theme/stitches.config';
import SnippetIcon from './snippet-icon';
import useClipboard from '../use-clipboard';
import {
  StyledSnippet,
  StyledSnippetPre,
  StyledSnippetCopyButton,
  SnippetVariantsProps
} from './snippet.styles';
import { __DEV__ } from '../utils/assertion';

interface Props {
  text?: string | string[];
  symbol?: string;
  showTooltip?: boolean;
  tooltipCopyText?: string;
  tooltipCopiedText?: string;
  copy?: CopyTypes;
  tooltipColor?: TooltipColors;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  symbol: '$',
  showTooltip: true,
  copy: 'default' as CopyTypes,
  tooltipColor: 'default' as TooltipColors | string,
  tooltipCopyText: 'Copy',
  tooltipCopiedText: 'Copied'
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type SnippetProps = Props &
  typeof defaultProps &
  NativeAttrs &
  SnippetVariantsProps & { css?: CSS };

const textArrayToString = (text: string[]): string => {
  return text.reduce((pre, current) => {
    if (!current) return pre;
    return pre ? `${pre}\n${current}` : current;
  }, '');
};

const Snippet: React.FC<React.PropsWithChildren<SnippetProps>> = ({
  bordered,
  children,
  symbol,
  showTooltip,
  text,
  tooltipCopyText,
  tooltipCopiedText,
  tooltipColor,
  copy: copyType,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const { copy } = useClipboard();
  const ref = useRef<HTMLPreElement>(null);
  const isMultiLine = text && Array.isArray(text);

  const showCopyIcon = useMemo(() => copyType !== 'prevent', [copyType]);

  const childText = useMemo<string | undefined | null>(() => {
    if (isMultiLine) return textArrayToString(text as string[]);
    if (!children) return text as string;
    if (!ref.current) return '';
    return ref.current.textContent;
  }, [ref.current, children, text]);

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
      copied && setCopied(false);
    }, 400);
  };

  return (
    <StyledSnippet {...props}>
      {isMultiLine ? (
        (text as string[]).map((t, index) => (
          <StyledSnippetPre
            css={{
              '&:before': {
                content: symbolBefore,
                us: 'none'
              }
            }}
            className="nextui-snippet-pre"
            key={`${index}-${t}`}
          >
            {t}
          </StyledSnippetPre>
        ))
      ) : (
        <StyledSnippetPre
          css={{
            '&:before': {
              content: symbolBefore,
              us: 'none'
            }
          }}
          className="nextui-snippet-pre"
          ref={ref}
        >
          {children || text}
        </StyledSnippetPre>
      )}
      {showCopyIcon && copyType !== 'slient' ? (
        <Tooltip
          hideArrow
          rounded
          color={tooltipColor}
          content={copied ? tooltipCopiedText : tooltipCopyText}
          onVisibleChange={handleTooltipVisibleChange}
        >
          <StyledSnippetCopyButton
            className="nextui-snippet-copy-button"
            onClick={clickHandler}
          >
            <SnippetIcon />
          </StyledSnippetCopyButton>
        </Tooltip>
      ) : (
        copyType !== 'prevent' && (
          <StyledSnippetCopyButton
            className="nextui-snippet-copy-button"
            onClick={clickHandler}
          >
            <SnippetIcon />
          </StyledSnippetCopyButton>
        )
      )}
    </StyledSnippet>
  );
};

if (__DEV__) {
  Snippet.displayName = 'NextUI.Snippet';
}

Snippet.toString = () => '.nextui-snippet';

const MemoSnippet = React.memo(Snippet);

export default withDefaults(MemoSnippet, defaultProps);
