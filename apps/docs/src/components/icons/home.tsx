import * as React from 'react';

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
}

const Home: React.FC<Props> = ({
  fill,
  size,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M9.02 2.84l-5.39 4.2A4.759 4.759 0 002 10.36v7.41a4.225 4.225 0 004.21 4.22h11.58A4.223 4.223 0 0022 17.78V10.5a4.723 4.723 0 00-1.8-3.45l-6.18-4.333a4.487 4.487 0 00-5 .123z" />
        <path data-name="Vector" d="M12 17.99v-3" />
      </g>
    </svg>
  );
};

export default Home;
