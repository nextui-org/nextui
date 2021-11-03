import React from 'react';
import useTheme from '../use-theme';

const CollapseIcon: React.FC<unknown> = ({ ...props }) => {
  const theme = useTheme();
  return (
    <svg
      role="presentation"
      focusable="false"
      className="collapse-icon"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke={theme.palette.accents_5}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MemoCollapseIcon = React.memo(CollapseIcon);

export default MemoCollapseIcon;
