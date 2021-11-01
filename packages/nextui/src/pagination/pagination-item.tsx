import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import { addColorAlpha } from '../utils/color';
import clsx from '../utils/clsx';
import withDefaults from '../utils/with-defaults';

interface Props {
  active?: boolean;
  onlyDots?: boolean;
  disabled?: boolean;
  animated?: boolean;
  preserveContent?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const defaultProps = {
  preserveContent: false
};

type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof Props>;
export type PaginationItemProps = Props & NativeAttrs;

const PaginationItem: React.FC<React.PropsWithChildren<PaginationItemProps>> =
  ({
    active,
    children,
    disabled,
    animated,
    onClick,
    onlyDots,
    preserveContent,
    ...props
  }) => {
    const theme = useTheme();

    const [hover] = useMemo(
      () => [addColorAlpha(theme.palette.accents_3, 0.2)],
      [theme.palette.primary]
    );

    const clickHandler = (event: React.MouseEvent) => {
      if (disabled) return;
      onClick && onClick(event);
    };

    return (
      <button
        className={clsx({
          active,
          animated,
          disabled,
          'only-dots': onlyDots,
          'preserve-content': preserveContent
        })}
        onClick={clickHandler}
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        <span className="button-content">{children}</span>
        <style jsx>{`
          button {
            border: none;
            position: relative;
            display: inline-flex;
            margin: 0 var(--next-ui-pagination-item-margin);
            align-items: center;
            justify-content: center;
            padding: 0;
            box-sizing: border-box;
            text-transform: capitalize;
            user-select: none;
            white-space: nowrap;
            text-align: center;
            vertical-align: middle;
            box-shadow: none;
            outline: none;
            height: var(--next-ui-pagination-size);
            min-width: var(--next-ui-pagination-size);
            font-size: inherit;
            cursor: pointer;
            border-radius: var(--next-ui-pagination-item-radius);
            color: ${theme.palette.text};
            background-color: ${theme.palette.accents_1};
            transition: ${animated
              ? 'transform 0.25s ease 0s, background 0.25s ease 0s'
              : 'none'};
          }
          .button-content {
            position: relative;
            display: inline-flex;
            align-items: center;
            top: 0;
            left: 0;
            z-index: 20;
          }
          .only-dots:not(.preserve-content) .button-content {
            display: none;
          }
          button:hover {
            background: ${hover};
          }
          .animated:not(.disabled):not(.active):active {
            transform: scale(var(--next-ui-pagination-scale-transform));
            font-size: calc(var(--next-ui-pagination-font-size) * 0.9);
          }
          .active {
            font-weight: bold;
            cursor: default;
            box-shadow: ${theme.expressiveness.shadowSmall};
          }
          .active .button-content {
            color: white;
          }
          .disabled {
            color: ${theme.palette.accents_4};
            cursor: not-allowed;
          }
          button :global(svg) {
            width: var(--next-ui-pagination-font-size);
            height: var(--next-ui-pagination-font-size);
          }
        `}</style>
      </button>
    );
  };

export default withDefaults(PaginationItem, defaultProps);
