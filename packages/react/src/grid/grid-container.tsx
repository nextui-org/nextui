import React, { useMemo } from 'react';
import { CSS } from '../theme/stitches.config';
import GridBasicItem, { GridItemProps } from './grid-item';
import { Wrap } from '../utils/prop-types';
import clsx from '../utils/clsx';
import withDefaults from '../utils/with-defaults';

interface Props {
  gap: number;
  wrap: Wrap;
  className: string;
  css?: CSS;
}

const defaultProps = {
  gap: 0,
  wrap: 'wrap' as Wrap,
  className: ''
};

export type GridContainerProps = Props & typeof defaultProps & GridItemProps;

const GridContainer = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<GridContainerProps>
>(({ gap, wrap, css, children, className, ...props }, ref) => {
  const gapUnit = useMemo(() => {
    return `calc(${gap} * $space$3)`;
  }, [gap]);

  return (
    <GridBasicItem
      ref={ref}
      className={clsx('nextui-grid-container', className)}
      css={{
        $$gridGapUnit: gapUnit,
        display: 'flex',
        flexWrap: wrap,
        boxZizing: 'border-box',
        margin: 'calc(-1 * $$gridGapUnit)',
        width: 'calc(100% + $$gridGapUnit * 2)',
        ...(css as any)
      }}
      {...props}
    >
      {children}
    </GridBasicItem>
  );
});

GridContainer.displayName = 'NextUI - GridContainer';
GridContainer.toString = () => '.nextui-grid-container';

export default withDefaults(GridContainer, defaultProps);
