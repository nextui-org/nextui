import React from "react";

import {__DEV__} from "../utils/assertion";

export interface DropdownIconProps {
  fill?: string;
  size?: string | number;
  height?: string | number;
  width?: string | number;
}

const DropdownIcon: React.FC<DropdownIconProps> = ({fill, size, height, width, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
        fill={fill}
      />
    </svg>
  );
};

if (__DEV__) {
  DropdownIcon.displayName = "NextUI.DropdownIcon";
}

DropdownIcon.toString = () => ".nextui-dropdown-icon";

export default DropdownIcon;
