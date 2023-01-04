import React from "react";
import {CSS, styled} from "@nextui-org/react";

export const StyledLinkIcon = styled("svg", {
  ml: "$1",
  as: "center",
  display: "flex",
  color: "currentColor",
});

export interface Props {
  fill?: string;
  width?: number;
  height?: number;
  size?: number;
  css?: CSS;
}

const LinkIcon: React.FC<Props> = ({
  fill = "currentColor",
  size,
  width = 24,
  height = 24,
  ...props
}) => (
  <StyledLinkIcon
    className="nextui-link-icon"
    fill="none"
    height={size || height}
    shapeRendering="geometricPrecision"
    stroke={fill}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
  </StyledLinkIcon>
);

export default LinkIcon;
