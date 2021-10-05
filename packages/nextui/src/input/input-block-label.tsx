import React from 'react';
import useTheme from '../use-theme';
import { addColorAlpha } from '../utils/color';
import clsx from '../utils/clsx';
import { SimpleColors } from '../utils/prop-types';

export interface InputBlockLabelLabel {
  labelId: string;
  label: string;
  htmlFor: string;
  fontSize: string;
  color?: string;
  isTextarea?: boolean;
  animated?: boolean;
  underlined?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  selfValue?: string;
  hasLeftContent?: boolean;
  asPlaceholder?: boolean;
  status?: SimpleColors;
  placeholderColor?: string;
  heightRatio?: string | undefined;
  hover?: boolean;
}

const InputBlockLabel: React.FC<InputBlockLabelLabel> = ({
  label,
  labelId,
  animated,
  htmlFor,
  fontSize,
  selfValue,
  color,
  status,
  rounded,
  bordered,
  underlined,
  asPlaceholder = false,
  placeholderColor,
  heightRatio,
  hasLeftContent,
  isTextarea,
  hover,
  ...props
}) => {
  const theme = useTheme();
  return (
    <label
      id={labelId}
      className={clsx('input-label-block', {
        'as-placeholder': asPlaceholder,
        'with-value': selfValue,
        'has-content-left': hasLeftContent,
        'is-textarea': isTextarea,
        underlined,
        rounded,
        hover,
      })}
      htmlFor={htmlFor}
      {...props}
    >
      {label}
      <style jsx>{`
        .input-label-block {
          display: block;
          font-weight: normal;
          color: ${color || theme.palette.text};
          padding: 0 0 0 4px;
          margin-bottom: ${theme.layout.gapQuarter};
          font-size: ${fontSize};
          line-height: 1.5;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
        }
        .input-label-block > :global(*:first-child) {
          margin-top: 0;
        }
        .input-label-block > :global(*:last-child) {
          margin-bottom: 0;
        }
        .input-label-block.rounded {
          padding: 0 0 0 ${theme.layout.gapQuarter};
        }
        .as-placeholder {
          position: absolute;
          padding: 0;
          z-index: 1;
          left: 12px;
          top: 20%;
          margin-bottom: 0;
          cursor: text;
          transition: ${animated
            ? 'left 0.25s ease 0s, color 0.25s ease 0s, top 0.25s ease 0s'
            : 'none'};
          color: ${placeholderColor || theme.palette.accents_3};
        }
        .as-placeholder.underlined {
          left: 4px;
        }
        .as-placeholder.has-content-left {
          left: calc(12px + ${heightRatio} * ${theme.layout.gap} * 0.64);
        }
        .as-placeholder.hover,
        .as-placeholder.with-value {
          color: ${placeholderColor && status !== 'default'
            ? addColorAlpha(placeholderColor, 1)
            : color || theme.palette.text};
          top: -72%;
          left: ${underlined ? '0px' : '4px'};
          cursor: inherit;
        }
        .as-placeholder.is-textarea {
          top: 10px;
        }
        .as-placeholder.is-textarea.hover,
        .as-placeholder.is-textarea.with-value {
          top: -22%;
        }
      `}</style>
    </label>
  );
};

const MemoInputBlockLabel = React.memo(InputBlockLabel);

export default MemoInputBlockLabel;
