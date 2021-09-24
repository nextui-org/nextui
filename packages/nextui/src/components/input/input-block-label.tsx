import React from 'react';
import useTheme from '../../hooks/use-theme';
import { addColorAlpha } from '../../utils/color';
import clsx from '../../utils/clsx';
import { SimpleColors } from '../../utils/prop-types';

export interface InputBlockLabelLabel {
  label: string;
  htmlFor: string;
  color?: string;
  animated?: boolean;
  selfValue?: string;
  hasIcon?: boolean;
  asPlaceholder?: boolean;
  status?: SimpleColors;
  placeholderColor?: string;
  heightRatio?: string | undefined;
  hover?: boolean;
}

const InputBlockLabel: React.FC<InputBlockLabelLabel> = ({
  label,
  animated,
  htmlFor,
  selfValue,
  color,
  status,
  asPlaceholder = false,
  placeholderColor,
  heightRatio,
  hasIcon,
  hover,
}) => {
  const theme = useTheme();
  return (
    <label
      className={clsx('input-label-block', {
        'as-placeholder': asPlaceholder,
        'with-value': selfValue,
        'has-icon-left': hasIcon,
        hover,
      })}
      htmlFor={htmlFor}
    >
      {label}
      <style jsx>{`
        .input-label-block {
          display: block;
          font-weight: normal;
          color: ${color || theme.palette.text};
          padding: 0 0 0 4px;
          margin-bottom: ${theme.layout.gapQuarter};
          font-size: 0.875rem;
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
        .as-placeholder {
          position: absolute;
          padding: 0;
          z-index: 10;
          left: 12px;
          top: 20%;
          margin-bottom: 0;
          cursor: text;
          transition: ${animated
            ? 'left 0.25s ease 0s, color 0.25s ease 0s, top 0.25s ease 0s'
            : 'none'};
          color: ${placeholderColor || theme.palette.accents_3};
        }
        .as-placeholder.has-icon-left {
          left: calc(12px + ${heightRatio} * ${theme.layout.gap} * 0.64);
        }
        .as-placeholder.hover,
        .as-placeholder.with-value {
          color: ${placeholderColor && status !== 'default'
            ? addColorAlpha(placeholderColor, 1)
            : color || theme.palette.text};
          top: calc(${heightRatio} * ${theme.layout.gapHalf} * -1 - 8px);
          left: 4px;
          cursor: inherit;
        }
      `}</style>
    </label>
  );
};

const MemoInputBlockLabel = React.memo(InputBlockLabel);

export default MemoInputBlockLabel;
