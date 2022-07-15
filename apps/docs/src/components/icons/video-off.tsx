import * as React from "react";
import {useTheme} from "@nextui-org/react";

import {IconProps} from "./index";

const VideoOff: React.FC<IconProps> = ({fill, filled, size, height, width, ...props}) => {
  const {theme} = useTheme();

  if (filled) {
    return (
      <svg
        height={size || height}
        viewBox="0 0 24 24"
        width={size || width}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M4 19h10.879L2.145 6.265C2.054 6.493 2 6.74 2 7v10C2 18.103 2.897 19 4 19zM18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7z"
          fill={fill || theme?.colors?.foreground?.value}
        />
      </svg>
    );
  }

  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7zM16 14.586L8.414 7H16V14.586zM4 19h10.879l-2-2H4V8.121L2.145 6.265C2.054 6.493 2 6.74 2 7v10C2 18.103 2.897 19 4 19z"
        fill={fill || theme?.colors?.foreground?.value}
      />
    </svg>
  );
};

export default VideoOff;
