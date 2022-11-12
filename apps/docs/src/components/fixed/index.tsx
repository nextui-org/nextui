import * as React from "react";
import cn from "classnames";
import withDefaults from "@utils/with-defaults";
import {styled, CSS} from "@nextui-org/react";

export interface FixedProps {
  offset?: number;
  shadow?: boolean;
  className?: string;
  css?: CSS;
  children?: React.ReactNode;
}

const defaultProps = {
  offset: 0,
  shadow: false,
  className: "",
};

const StyledFixed = styled("div", {
  background: "transparent",
  position: "fixed",
  zIndex: "$max",
  variants: {
    shadow: {
      true: {
        bs: "$sm",
      },
    },
  },
});

const Fixed: React.FC<FixedProps> = ({offset, children, shadow, className, css}) => {
  return (
    <StyledFixed
      className={cn(className, {shadow})}
      css={{...css, top: offset || 0}}
      shadow={shadow}
    >
      {children}
    </StyledFixed>
  );
};

const MemoFixed = React.memo(Fixed);

export default withDefaults(MemoFixed, defaultProps);
