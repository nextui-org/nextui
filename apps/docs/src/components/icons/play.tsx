import * as React from "react";
import withDefaults from "@utils/with-defaults";

import {IconProps, Icon} from "./index";

const defaultProps = {
  fill: "#ffffff",
};

const Play: React.FC<IconProps> = ({fill, filled, size, height, width, ...props}) => {
  return (
    <Icon
      fill={filled ? fill : "none"}
      height={size || height || 19}
      viewBox="0 0 14.71 17.33"
      width={size || width || 16}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.647 2.245v14.527c0 .252.07.5.202.716.133.217.324.396.552.516a1.486 1.486 0 0 0 1.48-.055l11.802-7.263c.207-.126.377-.301.495-.508a1.366 1.366 0 0 0 0-1.353 1.424 1.424 0 0 0-.495-.509L2.881 1.066a1.48 1.48 0 0 0-2.032.462 1.363 1.363 0 0 0-.202.717Z"
        fill={fill}
      />
    </Icon>
  );
};

export default withDefaults(Play, defaultProps);
