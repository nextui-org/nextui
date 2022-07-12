import * as React from "react";
import {useTheme} from "@nextui-org/react";

import {IconProps} from "./index";

const Lock: React.FC<IconProps> = ({fill, filled, size, height, width, label, ...props}) => {
  const {theme} = useTheme();

  return (
    <svg
      data-name="Iconly/Curved/Lock"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill || theme?.colors?.accents3?.value}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path d="M16.471 9.403V7.25a4.561 4.561 0 00-9.121-.016v2.169" data-name="Stroke 1" />
        <path d="M11.91 14.156v2.221" data-name="Stroke 3" />
        <path
          d="M11.91 8.824c-5.745 0-7.66 1.568-7.66 6.271s1.915 6.272 7.66 6.272 7.661-1.568 7.661-6.272-1.921-6.271-7.661-6.271z"
          data-name="Stroke 5"
        />
      </g>
    </svg>
  );
};

export default Lock;
