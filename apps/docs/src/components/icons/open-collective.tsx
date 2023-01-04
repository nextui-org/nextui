import * as React from "react";

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
}

const OpenCollective: React.FC<Props> = ({fill, size, width = 24, height = 24, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)" clipRule="evenodd" fill={fill} fillRule="evenodd">
        <path d="M21.865 5.166A11.945 11.945 0 0 1 24 12.001c0 2.54-.789 4.895-2.135 6.834l-3.109-3.109A7.679 7.679 0 0 0 19.714 12a7.679 7.679 0 0 0-.958-3.725l3.109-3.109Z" />
        <path d="m18.834 2.135-3.108 3.109a7.714 7.714 0 1 0 0 13.513l3.108 3.108A11.946 11.946 0 0 1 12 24C5.373 24 0 18.627 0 12S5.373 0 12 0c2.54 0 4.895.789 6.834 2.135Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h24v24H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default OpenCollective;
