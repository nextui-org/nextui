import React from 'react';
import {
  StyledCollapseIcon,
  CollapseIconVariantsProps
} from './collapse.styles';

const CollapseIcon: React.FC<CollapseIconVariantsProps> = ({ ...props }) => {
  return (
    <StyledCollapseIcon
      role="presentation"
      focusable="false"
      className="nextui-collapse-icon"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledCollapseIcon>
  );
};

CollapseIcon.toString = () => '.nextui-collapse-icon';

const MemoCollapseIcon = React.memo(CollapseIcon);

export default MemoCollapseIcon;
