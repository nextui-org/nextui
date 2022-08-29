import * as React from "react";

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const ChevronRight: React.FC<Props> = ({
  fill,
  size,
  width = 24,
  height = 24,
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        {...props}
      >
        <path d="M14.43 5.93L20.5 12l-6.07 6.07" />
        <path d="M3.5 12h16.83" />
      </g>
    </svg>
  );
};

export default ChevronRight;
