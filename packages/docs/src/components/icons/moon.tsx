import * as React from 'react';
import { IconProps } from './index';
import { useTheme } from '@nextui-org/react';

const Moon: React.FC<IconProps> = ({
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  const theme = useTheme();
  if (filled) {
    return (
      <svg
        viewBox="0 0 512 512"
        width={size || width || 24}
        height={size || height || 24}
        {...props}
      >
        <path
          fill={fill || theme.palette.primary}
          d="M152.62 126.77c0-33 4.85-66.35 17.23-94.77C87.54 67.83 32 151.89 32 247.38 32 375.85 136.15 480 264.62 480c95.49 0 179.55-55.54 215.38-137.85-28.42 12.38-61.8 17.23-94.77 17.23-128.47 0-232.61-104.14-232.61-232.61z"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 512 512"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <path
        d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
        fill="none"
        stroke={fill || theme.palette.accents_3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </svg>
  );
};

export default Moon;
