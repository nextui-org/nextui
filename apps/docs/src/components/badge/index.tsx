import React from "react";
import {CSS} from "@nextui-org/react";

import {StyledBadge, BadgeVariantsProps} from "./badge.styles";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;

type BadgeProps = Props & NativeAttrs & BadgeVariantsProps & {css?: CSS};

const Badge: React.FC<BadgeProps> = ({children, ...props}) => {
  return <StyledBadge {...props}>{children}</StyledBadge>;
};

export default Badge;
