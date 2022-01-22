import * as React from 'react';

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
}

const Maximize: React.FC<Props> = ({
  fill,
  size,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 10V6h-4M6 14v4h4"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Maximize;
