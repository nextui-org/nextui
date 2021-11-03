import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import GridBasicItem, { GridBasicItemComponentProps } from './basic-item';
import { Wrap } from '../utils/prop-types';
import css from 'styled-jsx/css';

interface Props {
  gap: number;
  wrap: Wrap;
  className: string;
}

const defaultProps = {
  gap: 0,
  wrap: 'wrap' as Wrap,
  className: ''
};

export type GridContainerProps = Props &
  typeof defaultProps &
  GridBasicItemComponentProps;

const GridContainer: React.FC<React.PropsWithChildren<GridContainerProps>> = ({
  gap,
  wrap,
  children,
  className,
  ...props
}) => {
  const theme = useTheme();
  const gapUnit = useMemo(() => {
    return `calc(${gap} * ${theme.layout.gapQuarter})`;
  }, [gap, theme.layout.gapQuarter]);

  const { className: resolveClassName, styles } = css.resolve`
    --grid-gap-unit: ${gapUnit};
    display: flex;
    flex-wrap: ${wrap};
    box-sizing: border-box;
    margin: calc(-1 * var(--grid-gap-unit));
    width: calc(100% + var(--grid-gap-unit) * 2);
  `;

  return (
    <GridBasicItem className={`${resolveClassName} ${className}`} {...props}>
      {children}
      {styles}
    </GridBasicItem>
  );
};

type MemoGridContainerComponent<P = {}> = React.NamedExoticComponent<P>;
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  GridBasicItemComponentProps;

GridContainer.defaultProps = defaultProps;

export default React.memo(
  GridContainer
) as MemoGridContainerComponent<ComponentProps>;
