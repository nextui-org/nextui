import React from 'react';
import { IconProps } from './index';
import { NextUIThemes, useTheme } from '@nextui-org/react';

const Minus: React.FC<IconProps> = ({
  fill,
  size,
  height,
  width,
  ...props
}) => {
  const theme = useTheme() as NextUIThemes;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M6 12h12"
        fill="none"
        stroke={fill || theme.palette.text}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default Minus;
