import * as React from 'react';

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
}

const RoundPointer: React.FC<Props> = ({
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
        d="m20.96 17.84-1.63.55c-.45.15-.81.5-.96.96l-.55 1.63c-.47 1.41-2.45 1.38-2.89-.03L13.08 15c-.36-1.18.73-2.28 1.9-1.91l5.96 1.85c1.4.44 1.42 2.43.02 2.9Z"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RoundPointer;
