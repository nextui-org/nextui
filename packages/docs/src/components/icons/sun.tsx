import * as React from 'react';
import { IconProps } from './index';
import { useTheme } from '@nextui-org/react';

const Sun: React.FC<IconProps> = ({
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
        width={size || width}
        height={size || height}
        viewBox="0 0 24 24"
        {...props}
      >
        <g fill={fill || theme.palette.foreground}>
          <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
          <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
        </g>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={fill || theme.palette.foreground}
        d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19H12.998V22H10.998zM10.998 2H12.998V5H10.998zM1.998 11H4.998V13H1.998zM18.998 11H21.998V13H18.998z"
      ></path>
      <path
        fill={fill || theme.palette.foreground}
        transform="rotate(-45.017 5.986 18.01)"
        d="M4.487 17.01H7.487V19.01H4.487z"
      ></path>
      <path
        fill={fill || theme.palette.foreground}
        transform="rotate(-45.001 18.008 5.99)"
        d="M16.508 4.99H19.509V6.99H16.508z"
      ></path>
      <path
        fill={fill || theme.palette.foreground}
        transform="rotate(-134.983 5.988 5.99)"
        d="M4.487 4.99H7.487V6.99H4.487z"
      ></path>
      <path
        fill={fill || theme.palette.foreground}
        transform="rotate(134.999 18.008 18.01)"
        d="M17.008 16.51H19.008V19.511000000000003H17.008z"
      ></path>
    </svg>
  );
};

export default Sun;
