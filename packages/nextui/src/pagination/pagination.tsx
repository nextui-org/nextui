import React, { useMemo, useCallback } from 'react';
import { NormalColors, NormalSizes, NormalWeights } from '../utils/prop-types';
import { getPaginationSizes } from './styles';
import usePagination, { DOTS, PaginationItemParam } from '../use-pagination';
import PaginationItem from './pagination-item';
import PaginationEllipsis from './pagination-ellipsis';
import PaginationIcon from './pagination-icon';
import PaginationHighlight from './pagination-highlight';
import useTheme from '../use-theme';
import clsx from '../utils/clsx';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import { getNormalColor } from '../utils/color';
import { getNormalWeight } from '../utils/dimensions';
import { __DEV__ } from '../utils/assertion';

interface Props extends DefaultProps {
  color?: NormalColors | string;
  size?: NormalSizes | number;
  page?: number;
  shadow?: boolean;
  rounded?: boolean;
  onlyDots?: boolean;
  initialPage?: number;
  loop?: boolean;
  animated?: boolean;
  controls?: boolean;
  noMargin?: boolean;
  dotsJump?: number;
  total?: number;
  bordered?: boolean;
  borderWeight?: NormalWeights;
  siblings?: number;
  boundaries?: number;
  onChange?: (page: number) => void;
}

const defaultProps = {
  color: 'primary' as NormalColors | string,
  size: 'md' as NormalSizes | number,
  borderWeight: 'normal' as NormalWeights,
  shadow: false,
  rounded: false,
  controls: true,
  bordered: false,
  onlyDots: false,
  noMargin: false,
  initialPage: 1,
  siblings: 1,
  boundaries: 1,
  dotsJump: 5,
  total: 1,
  loop: false,
  animated: true
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type PaginationProps = Props & typeof defaultProps & NativeAttrs;

const preClass = 'nextui-pagination';

const Pagination: React.FC<React.PropsWithChildren<PaginationProps>> = ({
  page,
  initialPage,
  total,
  size,
  color,
  loop,
  siblings,
  boundaries,
  shadow,
  rounded,
  animated,
  bordered,
  borderWeight,
  onlyDots,
  dotsJump,
  controls,
  noMargin,
  onChange,
  ...props
}) => {
  const { range, active, setPage, previous, next, first, last } = usePagination(
    {
      page,
      initialPage,
      siblings: onlyDots ? 10 : siblings,
      boundaries: onlyDots ? 10 : boundaries,
      total,
      onChange
    }
  );

  const theme = useTheme();

  const { stringCss } = getSpacingsStyles(theme, props);

  const bgColor = useMemo(
    () => getNormalColor(color, theme.palette, theme.palette.primary),
    [color, theme.palette]
  );
  const { font, width } = useMemo(() => getPaginationSizes(size), [size]);

  const radius = useMemo(
    () => (noMargin ? '0px' : rounded || onlyDots ? '100%' : '33%'),
    [rounded, onlyDots, noMargin]
  );

  const weight = useMemo(
    () => (bordered ? getNormalWeight(theme, borderWeight) : '0px'),
    [theme, bordered, borderWeight]
  );

  const renderItem = useCallback(
    (value: PaginationItemParam, index: number) => {
      if (value === DOTS) {
        const isBefore = index < range.indexOf(active);
        return (
          <PaginationEllipsis
            key={`${preClass}-item-${value}-${index}`}
            value={value}
            bordered={bordered}
            animated={animated}
            isBefore={isBefore}
            onlyDots={onlyDots}
            onClick={() =>
              isBefore
                ? setPage(active - dotsJump >= 1 ? active - dotsJump : 1)
                : setPage(
                    active + dotsJump <= total ? active + dotsJump : total
                  )
            }
          />
        );
      }
      return (
        <PaginationItem
          key={`${preClass}-item-${value}-${index}`}
          value={value}
          animated={animated}
          bordered={bordered}
          active={value === active}
          onClick={() => setPage(value)}
          onlyDots={onlyDots}
        >
          {value}
        </PaginationItem>
      );
    },
    [total, onlyDots, active, bordered, animated]
  );

  const handleNext = () => {
    if (loop && active === total) {
      return first();
    }
    return next();
  };

  const handlePrevious = () => {
    if (loop && active === 1) {
      return last();
    }
    return previous();
  };

  return (
    <nav
      className={clsx(preClass, {
        [`${preClass}-no-margin`]: noMargin,
        [`${preClass}-bordered`]: bordered
      })}
      {...props}
    >
      {controls && (
        <PaginationIcon
          isPrev
          bordered={bordered}
          animated={animated}
          onlyDots={onlyDots}
          onClick={handlePrevious}
          disabled={!loop && active === 1}
        />
      )}
      <PaginationHighlight
        noMargin={noMargin}
        animated={animated}
        color={bgColor}
        shadow={shadow}
        active={controls ? range.indexOf(active) + 1 : range.indexOf(active)}
      />
      {range.map(renderItem)}
      {controls && (
        <PaginationIcon
          bordered={bordered}
          animated={animated}
          onlyDots={onlyDots}
          onClick={handleNext}
          disabled={!loop && active === total}
        />
      )}
      <style jsx>{`
        .${preClass} {
          margin: 0;
          padding: 0;
          display: inline-flex;
          position: relative;
          font-variant: tabular-nums;
          font-feature-settings: 'tnum';
          font-size: ${font};
          --nextui-pagination-item-radius: ${radius};
          --nextui-pagination-item-border-weight: ${weight};
          --nextui-pagination-item-margin: ${noMargin ? '0' : '2px'};
          --nextui-pagination-item-color: ${bgColor};
          --nextui-pagination-size: ${onlyDots ? `calc(${width} / 2)` : width};
          --nextui-pagination-font-size: ${font};
          --nextui-pagination-scale-transform: ${onlyDots ? 0.8 : 0.9};
          ${stringCss};
        }
        .${preClass} :global(.${preClass}-item:last-of-type) {
          ${!stringCss?.includes('margin') ? 'margin-right: 0;' : ''};
        }
        .${preClass}-no-margin :global(.${preClass}-item:first-of-type) {
          border-top-left-radius: 33%;
          border-bottom-left-radius: 33%;
        }
        .${preClass}-no-margin :global(.${preClass}-item:last-of-type) {
          border-top-right-radius: 33%;
          border-bottom-right-radius: 33%;
        }
        .${preClass}-no-margin.${preClass}-bordered
          :global(${preClass}-item:not(:last-child)) {
          border-right: 0;
        }
      `}</style>
    </nav>
  );
};

type MemoPaginationComponent<P = {}> = React.NamedExoticComponent<P>;

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

Pagination.defaultProps = defaultProps;

if (__DEV__) {
  Pagination.displayName = 'NextUI - Pagination';
}

export default React.memo(
  Pagination
) as MemoPaginationComponent<ComponentProps>;
