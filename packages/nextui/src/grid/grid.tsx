import React from 'react';
import css from 'styled-jsx/css';
import GridContainer from './grid-container';
import GridBasicItem, { GridBasicItemComponentProps } from './basic-item';
import { DefaultProps } from '../utils/default-props';

interface Props extends DefaultProps {
  className: string;
}

const defaultProps = {
  className: ''
};

export type GridProps = Props &
  typeof defaultProps &
  GridBasicItemComponentProps;

const Grid: React.FC<React.PropsWithChildren<GridProps>> = ({
  children,
  className,
  ...props
}) => {
  const { className: resolveClassName, styles } = css.resolve`
    margin: 0;
    box-sizing: border-box;
    padding: var(--grid-gap-unit);
  `;
  return (
    <GridBasicItem className={`${resolveClassName} ${className}`} {...props}>
      {children}
      {styles}
    </GridBasicItem>
  );
};

type MemoGridComponent<P = {}> = React.NamedExoticComponent<P> & {
  Container: typeof GridContainer;
};
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  GridBasicItemComponentProps;

Grid.defaultProps = defaultProps;

export default React.memo(Grid) as MemoGridComponent<ComponentProps>;
