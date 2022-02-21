import React, { useMemo } from 'react';
import clsx from '../utils/clsx';
import { CSS } from '../theme/stitches.config';
import {
  StyledPaginationHighlight,
  PaginationHighlightVariantsProps
} from './pagination.styles';
import { mergeProps } from '@react-aria/utils';

interface Props {
  active: number;
  rounded?: boolean;
  noMargin?: boolean;
  shadow?: boolean;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type PaginationHighlightProps = Props &
  NativeAttrs &
  PaginationHighlightVariantsProps;

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
        ? `var(--nextui--paginationSize) * ${active}`
        : `var(--nextui--paginationSize) * ${active} + ${active * 4 + 2}px`,
    [active, noMargin]
  );

  return (
    <StyledPaginationHighlight
      aria-hidden={true}
      shadow={shadow}
      rounded={rounded}
      className={clsx(
        'nextui-pagination-highlight',
        {
          'nextui-pagination-highlight--rounded': rounded,
          'nextui-pagination-highlight--active': active,
          'nextui-pagination-highlight--no-margin': noMargin,
          'nextui-pagination-highlight--shadow': shadow
        },
        props.className
      )}
      noMargin={noMargin}
      style={mergeProps(
        { '--nextui--paginationLeft': `calc(${leftValue})` },
        props?.style || {}
      )}
      css={{
        left: `var(--nextui--paginationLeft)`,
        ...(css as any)
      }}
      {...props}
    />
  );
};

PaginationHighlight.toString = () => '.nextui-pagination-highlight';

export default PaginationHighlight;
