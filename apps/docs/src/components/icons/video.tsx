import * as React from "react";
import {useTheme} from "@nextui-org/react";

import {IconProps} from "./index";

const Video: React.FC<IconProps> = ({fill, filled, size, height, width, label, ...props}) => {
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
          d="M18,7c0-1.103-0.897-2-2-2H4C2.897,5,2,5.897,2,7v10c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2v-3.333L22,17V7l-4,3.333 V7z"
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
        d="M18,7c0-1.103-0.897-2-2-2H4C2.897,5,2,5.897,2,7v10c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2v-3.333L22,17V7l-4,3.333 V7z M16.002,17H4V7h12l0.001,4.999L16,12l0.001,0.001L16.002,17z"
        fill={fill || theme?.colors?.foreground?.value}
      />
    </svg>
  );
};

export default Video;
