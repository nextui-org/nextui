import * as React from 'react';

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
  className?: string;
}

const ArrowRight: React.FC<Props> = ({
  fill,
  size,
  width = 24,
  height = 24,
  className,
  ...props
}) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.5 5l7 7-7 7"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
