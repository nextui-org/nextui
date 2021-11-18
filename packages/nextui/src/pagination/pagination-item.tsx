import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import { addColorAlpha } from '../utils/color';
import { DOTS } from '../use-pagination';
import clsx from '../utils/clsx';
import withDefaults from '../utils/with-defaults';
import { getFocusStyles } from '../utils/styles';

interface Props {
  active?: boolean;
  value?: string | number;
  onlyDots?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  animated?: boolean;
  preserveContent?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const defaultProps = {
  preserveContent: false
};

const getItemAriaLabel = (page?: string | number) => {
  if (!page) return;
  switch (page) {
    case DOTS:
      return 'dots element';
    case '<':
      return 'previous page button';
    case '>':
      return 'next page button';
    case 'first':
      return 'first page button';
    case 'last':
      return 'last page button';
    default:
      return `${page} item`;
  }
};

type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof Props>;
export type PaginationItemProps = Props & NativeAttrs;

const preClass = 'nextui-pagination-item';

const PaginationItem: React.FC<React.PropsWithChildren<PaginationItemProps>> =
  ({
    active,
    value,
    children,
    disabled,
    animated,
    bordered,
    onClick,
    onlyDots,
    preserveContent,
    ...props
  }) => {
    const theme = useTheme();

    const ariaLabel = useMemo(
      () =>
        active ? `${getItemAriaLabel(value)} active` : getItemAriaLabel(value),
      [value, active]
    );

    const { className: focusClassName, styles: focusStyles } =
      getFocusStyles(theme);

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
        className={clsx(
          preClass,
          {
            [`${preClass}-active`]: active,
            [`${preClass}-animated`]: animated,
            [`${preClass}-disabled`]: disabled,
            [`${preClass}-bordered`]: bordered,
            [`${preClass}-only-dots`]: onlyDots,
            [`${preClass}-preserve-content`]: preserveContent
          },
          focusClassName
        )}
        onClick={clickHandler}
        aria-label={ariaLabel}
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        <span className={`${preClass}-content`}>{children}</span>
        <style jsx>{`
          .${preClass} {
            border: none;
            position: relative;
            display: inline-flex;
            margin: 0 var(--nextui-pagination-item-margin);
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
            height: var(--nextui-pagination-size);
            min-width: var(--nextui-pagination-size);
            font-size: inherit;
            cursor: pointer;
            border-radius: var(--nextui-pagination-item-radius);
            color: ${theme.palette.text};
            background-color: ${theme.palette.accents_1};
            transition: ${animated
              ? 'transform 0.25s ease 0s, background 0.25s ease 0s, box-shadow 0.25s ease 0s'
              : 'none'};
          }
          .${preClass}:hover {
            background: ${hover};
          }
          .${preClass} :global(svg) {
            width: var(--nextui-pagination-font-size);
            height: var(--nextui-pagination-font-size);
          }
          .${preClass}-content {
            position: relative;
            display: inline-flex;
            align-items: center;
            top: 0;
            left: 0;
            z-index: 20;
          }
          .${preClass}-only-dots:not(.${preClass}-preserve-content)
            .${preClass}-content {
            display: none;
          }
          .${preClass}-animated:not(.${preClass}-disabled):not(.${preClass}-active):active {
            transform: scale(var(--nextui-pagination-scale-transform));
            font-size: calc(var(--nextui-pagination-font-size) * 0.9);
          }
          .${preClass}-active {
            font-weight: bold;
            cursor: default;
            box-shadow: ${theme.shadows.sm};
          }
          .${preClass}-active .${preClass}-content {
            color: white;
          }
          .${preClass}-disabled {
            color: ${theme.palette.accents_4};
            cursor: not-allowed;
          }
          .${preClass}-bordered {
            background-color: transparent;
            border: var(--nextui-pagination-item-border-weight) solid
              ${theme.palette.accents_2};
          }
        `}</style>
        {focusStyles}
      </button>
    );
  };

export default withDefaults(PaginationItem, defaultProps);
