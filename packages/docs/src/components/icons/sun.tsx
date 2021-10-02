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
        xmlns="http://www.w3.org/2000/svg"
        width={size || width}
        height={size || height}
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fill={fill || theme.palette.foreground}
          d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19H13V22H11zM11 2H13V5H11zM2 11H5V13H2zM19 11H22V13H19z"
        ></path>
        <path
          fill={fill || theme.palette.foreground}
          transform="rotate(-134.999 5.99 18.01)"
          d="M4.989 16.51H6.989V19.51H4.989z"
        ></path>
        <path
          fill={fill || theme.palette.foreground}
          transform="rotate(-45.001 18.01 5.99)"
          d="M16.51 4.99H19.511000000000003V6.99H16.51z"
        ></path>
        <path
          fill={fill || theme.palette.foreground}
          transform="rotate(-134.983 5.99 5.99)"
          d="M4.489 4.99H7.489V6.99H4.489z"
        ></path>
        <path
          fill={fill || theme.palette.foreground}
          transform="rotate(134.999 18.01 18.01)"
          d="M17.01 16.51H19.01V19.511000000000003H17.01z"
        ></path>
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
