import * as React from "react";

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
}

const Patreon: React.FC<Props> = ({fill, size, width = 24, height = 24, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)" fill={fill}>
        <path d="M15.294 17.986c4.766 0 8.63-4.026 8.63-8.993C23.923 4.026 20.06 0 15.293 0c-4.766 0-8.63 4.026-8.63 8.993 0 4.967 3.864 8.993 8.63 8.993ZM4.218 0H0v23.991h4.218V0Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h24v24H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Patreon;
