import * as React from 'react';
import { IconProps } from './index';
import { useTheme } from '@nextui/react';

const Lock: React.FC<IconProps> = ({
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  const theme = useTheme();
  return (
    <svg
      data-name="Iconly/Curved/Lock"
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke={fill || theme.palette.accents_3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          data-name="Stroke 1"
          d="M16.471 9.403V7.25a4.561 4.561 0 00-9.121-.016v2.169"
        />
        <path data-name="Stroke 3" d="M11.91 14.156v2.221" />
        <path
          data-name="Stroke 5"
          d="M11.91 8.824c-5.745 0-7.66 1.568-7.66 6.271s1.915 6.272 7.66 6.272 7.661-1.568 7.661-6.272-1.921-6.271-7.661-6.271z"
        />
      </g>
    </svg>
  );
};

export default Lock;
