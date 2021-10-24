import React from 'react';
import useTheme from '../use-theme';

const CollapseIcon: React.FC<unknown> = ({ ...props }) => {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M15.002 19.92L8.479 13.4a1.986 1.986 0 010-2.8l6.523-6.52"
        fill="none"
        stroke={theme.palette.accents_5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const MemoCollapseIcon = React.memo(CollapseIcon);

export default MemoCollapseIcon;
