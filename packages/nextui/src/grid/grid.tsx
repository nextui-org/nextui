import React from 'react';
import GridContainer from './grid-container';
import GridBasicItem, { GridItemProps } from './grid-item';

export type GridProps = GridItemProps;

const Grid: React.FC<React.PropsWithChildren<GridProps>> = ({
  children,
  css,
  ...props
}) => {
  return (
    <GridBasicItem css={{ ...(css as any) }} {...props}>
      {children}
    </GridBasicItem>
  );
};

type GridComponent<P = {}> = React.NamedExoticComponent<P> & {
  Container: typeof GridContainer;
};

export default Grid as GridComponent<GridProps>;
