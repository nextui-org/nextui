import React from 'react';
import PaginationItem from './pagination-item';
import { StyledPaginationIcon } from './pagination.styles';
import { CSS } from '../theme/stitches.config';

interface Props {
  isPrev?: boolean;
  disabled?: boolean;
  onlyDots?: boolean;
  animated?: boolean;
  bordered?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

type NativeAttrs = Omit<React.SVGAttributes<unknown>, keyof Props>;

export type PaginationIconProps = Props & NativeAttrs & { css?: CSS };

const PaginationIcon: React.FC<PaginationIconProps> = ({
  isPrev,
  disabled,
  onlyDots,
  animated,
  bordered,
  onClick,
  ...props
}) => {
  return (
    <PaginationItem
      preserveContent
      value={isPrev ? '<' : '>'}
      bordered={bordered}
      animated={animated}
      onlyDots={onlyDots}
      disabled={disabled}
      onClick={(e) => onClick && onClick(e)}
    >
      <StyledPaginationIcon
        role="presentation"
        focusable="false"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="nextui-pagination-icon"
        isPrev={isPrev}
        {...props}
      >
        <path
          d="M15.5 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </StyledPaginationIcon>
    </PaginationItem>
  );
};

PaginationIcon.toString = () => '.nextui-pagination-icon';

const MemoPaginationIcon = React.memo(PaginationIcon);

export default MemoPaginationIcon;
