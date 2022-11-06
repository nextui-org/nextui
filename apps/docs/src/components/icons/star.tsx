import * as React from "react";

import {IconProps} from "./index";

const Star: React.FC<IconProps> = ({fill, size, width = 24, height = 24, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m10.297 2.632 1.32 2.64c.18.368.66.72 1.065.788l2.393.397c1.53.255 1.89 1.365.787 2.46l-1.86 1.86c-.315.316-.487.923-.39 1.358l.533 2.303c.42 1.822-.548 2.527-2.16 1.574l-2.243-1.327c-.405-.24-1.072-.24-1.485 0l-2.242 1.327c-1.605.953-2.58.24-2.16-1.575l.532-2.302c.098-.435-.075-1.043-.39-1.357l-1.86-1.86c-1.095-1.096-.742-2.206.788-2.46l2.392-.398c.398-.068.878-.42 1.058-.788l1.32-2.64c.72-1.432 1.89-1.432 2.602 0Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export default Star;
