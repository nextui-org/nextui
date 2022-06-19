import * as React from "react";

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
}

const ChevronLeft: React.FC<Props> = ({fill, size, width = 24, height = 24, ...props}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <path d="M9.57 5.93L3.5 12l6.07 6.07" />
        <path d="M20.5 12H3.67" />
      </g>
    </svg>
  );
};

export default ChevronLeft;
