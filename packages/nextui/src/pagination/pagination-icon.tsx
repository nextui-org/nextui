import React from 'react';
import PaginationItem from './pagination-item';

export interface PaginationIconProps {
  isPrev?: boolean;
  disabled?: boolean;
  onlyDots?: boolean;
  animated?: boolean;
  bordered?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

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
      <svg
        role="presentation"
        focusable="false"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M15.5 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <style jsx>{`
        svg {
          transform: rotate(${isPrev ? '0deg' : '180deg'});
        }
      `}</style>
    </PaginationItem>
  );
};

const MemoPaginationIcon = React.memo(PaginationIcon);

export default MemoPaginationIcon;
