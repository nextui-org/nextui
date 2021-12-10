import React, { useMemo } from 'react';
import clsx from '../utils/clsx';
import { CSS } from '../theme/stitches.config';
import {
  StyledPaginationHighlight,
  PaginationHighlightVariantsProps
} from './pagination.styles';

interface Props {
  active: number;
  rounded?: boolean;
  noMargin?: boolean;
  shadow?: boolean;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
}

export type PaginationHighlightProps = Props & PaginationHighlightVariantsProps;

const PaginationHighlight: React.FC<PaginationHighlightProps> = ({
  active,
  shadow,
  noMargin,
  rounded,
  css,
  ...props
}) => {
  const leftValue = useMemo(
    () =>
      noMargin
        ? `$$paginationSize * ${active}`
        : `$$paginationSize * ${active} + ${active * 4 + 2}px`,
    [active, noMargin]
  );

  return (
    <StyledPaginationHighlight
      aria-hidden={true}
      shadow={shadow}
      rounded={rounded}
      className={clsx('nextui-pagination-highlight', {
        'nextui-pagination-highlight--rounded': rounded,
        'nextui-pagination-highlight--active': active,
        'nextui-pagination-highlight--no-margin': noMargin,
        'nextui-pagination-highlight--shadow': shadow
      })}
      noMargin={noMargin}
      css={{
        ...(css as any),
        left: `calc(${leftValue})`
      }}
      {...props}
    />
  );
};

export default PaginationHighlight;
