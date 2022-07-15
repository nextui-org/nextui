import * as React from "react";
import {useTheme} from "@nextui-org/react";

import {IconProps} from "./index";

const MicrophoneOff: React.FC<IconProps> = ({fill, filled, size, height, width, ...props}) => {
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
          d="M21.707 20.293l-3.4-3.4C19.362 15.54 20 13.846 20 12h-2c0 1.293-.419 2.487-1.119 3.467l-1.449-1.45C15.785 13.424 16 12.74 16 12V6c0-2.217-1.785-4.021-3.979-4.021-.07 0-.14.009-.209.025C9.693 2.104 8 3.857 8 6v.586L3.707 2.293 2.293 3.707l18 18L21.707 20.293zM6 12H4c0 4.072 3.06 7.436 7 7.931V22h2v-2.069c.789-.099 1.54-.318 2.241-.63l-1.549-1.548C13.155 17.911 12.588 18 12 18 8.691 18 6 15.309 6 12z"
          fill={fill || theme?.colors?.foreground?.value}
        />
        <path
          d="M8.007,12.067c0.036,2.151,1.775,3.89,3.926,3.926L8.007,12.067z"
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
        d="M21.707 20.293l-3.388-3.388C19.368 15.553 20 13.861 20 12.021h-2c0 1.289-.415 2.478-1.109 3.456l-1.452-1.452C15.787 13.434 16 12.755 16 12.021v-6C16 3.804 14.215 2 12.021 2c-.07 0-.14.009-.209.025C9.693 2.124 8 3.878 8 6.021v.565L3.707 2.293 2.293 3.707l18 18L21.707 20.293zM10 6.021c0-1.103.897-2 2-2 .054 0 .109-.005.164-.015C13.188 4.08 14 4.956 14 6.021v6c0 .172-.029.335-.071.494L10 8.586V6.021zM6 12.021H5 4c0 4.072 3.06 7.436 7 7.931v2.069h2v-2.07c.778-.099 1.524-.305 2.218-.611l-1.558-1.558c-.527.152-1.083.239-1.66.239C8.691 18.021 6 15.329 6 12.021z"
        fill={fill || theme?.colors?.foreground?.value}
      />
      <path
        d="M8.011,12.132c0.06,2.115,1.762,3.817,3.877,3.877L8.011,12.132z"
        fill={fill || theme?.colors?.foreground?.value}
      />
    </svg>
  );
};

export default MicrophoneOff;
