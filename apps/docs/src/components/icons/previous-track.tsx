import * as React from "react";
import withDefaults from "@utils/with-defaults";

import {IconProps, Icon} from "./index";

const defaultProps = {
  fill: "currentColor",
};

const PreviousTrack: React.FC<IconProps> = ({
  fill,
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <Icon
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.69 20.09c-.57 0-1.13-.15-1.65-.45l-8.29-4.78A3.284 3.284 0 0 1 6.1 12c0-1.19.62-2.26 1.65-2.86l8.29-4.78c1.03-.6 2.26-.6 3.3 0s1.65 1.66 1.65 2.86v9.57c0 1.19-.62 2.26-1.65 2.86-.52.29-1.08.44-1.65.44Zm0-14.68c-.31 0-.62.08-.9.24L8.5 10.43c-.56.33-.9.91-.9 1.56s.34 1.23.9 1.56l8.29 4.78c.56.33 1.24.33 1.8 0s.9-.91.9-1.56V7.2c0-.65-.34-1.23-.9-1.56-.28-.14-.59-.23-.9-.23ZM3.76 18.93c-.41 0-.75-.34-.75-.75V5.82c0-.41.34-.75.75-.75s.75.34.75.75v12.36c0 .41-.34.75-.75.75Z"
        fill={fill}
      />
    </Icon>
  );
};

export default withDefaults(PreviousTrack, defaultProps);
