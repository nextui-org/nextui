import * as React from "react";

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
}

const ArrowLeft: React.FC<Props> = ({fill, size, width = 24, height = 24, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default ArrowLeft;
