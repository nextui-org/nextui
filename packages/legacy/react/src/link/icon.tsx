import React from "react";

import {StyledLinkIcon} from "./link.styles";

export const LinkIcon: React.FC<{}> = () => {
  return (
    <StyledLinkIcon
      className="nextui-link-icon"
      fill="none"
      height="1em"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </StyledLinkIcon>
  );
};

LinkIcon.toString = () => ".nextui-link-icon";

export default React.memo(LinkIcon);
