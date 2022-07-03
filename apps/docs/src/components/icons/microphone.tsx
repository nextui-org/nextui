import * as React from "react";
import {useTheme} from "@nextui-org/react";

import {IconProps} from "./index";

const Microphone: React.FC<IconProps> = ({fill, filled, size, height, width, label, ...props}) => {
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
          d="M12,16c2.206,0,4-1.794,4-4V6c0-2.217-1.785-4.021-3.979-4.021c-0.069,0-0.14,0.009-0.209,0.025C9.693,2.104,8,3.857,8,6v6 C8,14.206,9.794,16,12,16z"
          fill={fill || theme?.colors?.foreground?.value}
        />
        <path
          d="M11,19.931V22h2v-2.069c3.939-0.495,7-3.858,7-7.931h-2c0,3.309-2.691,6-6,6s-6-2.691-6-6H4 C4,16.072,7.061,19.436,11,19.931z"
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
        d="M16,12V6c0-2.217-1.785-4.021-3.979-4.021c-0.069,0-0.14,0.009-0.209,0.025C9.693,2.104,8,3.857,8,6v6c0,2.206,1.794,4,4,4 S16,14.206,16,12z M10,12V6c0-1.103,0.897-2,2-2c0.055,0,0.109-0.005,0.163-0.015C13.188,4.06,14,4.935,14,6v6c0,1.103-0.897,2-2,2 S10,13.103,10,12z"
        fill={fill || theme?.colors?.foreground?.value}
      />
      <path
        d="M6,12H4c0,4.072,3.061,7.436,7,7.931V22h2v-2.069c3.939-0.495,7-3.858,7-7.931h-2c0,3.309-2.691,6-6,6S6,15.309,6,12z"
        fill={fill || theme?.colors?.foreground?.value}
      />
    </svg>
  );
};

export default Microphone;
