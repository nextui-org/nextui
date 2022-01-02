import * as React from 'react';
import { IconProps } from './index';
import { useTheme } from '@nextui-org/react';

const Heart: React.FC<IconProps> = ({
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <svg
      data-name="Iconly/Curved/Heart"
      xmlns="http://www.w3.org/2000/svg"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill={filled ? fill || theme?.colors?.accents3?.value : 'none'}
        stroke={fill || theme?.colors?.accents3?.value}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          data-name="Stroke 1"
          d="M2.922 12.45c-1.072-3.354.182-7.519 3.699-8.651a4.869 4.869 0 015.429 1.69 4.73 4.73 0 015.42-1.69c3.516 1.132 4.778 5.3 3.706 8.647-1.67 5.31-7.5 8.076-9.126 8.076s-7.4-2.704-9.128-8.072z"
        />
        <path
          data-name="Stroke 3"
          d="M15.788 7.564a2.154 2.154 0 011.917 2.422"
        />
      </g>
    </svg>
  );
};

export default Heart;
