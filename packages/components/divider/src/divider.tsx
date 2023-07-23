import {forwardRef} from "react";

import {UseDividerProps, useDivider} from "./use-divider";

export interface DividerProps extends Omit<UseDividerProps, "children"> {}

const Divider = forwardRef<HTMLElement, DividerProps>((props, ref) => {
  const {Component, getDividerProps} = useDivider({ref, ...props});

  return <Component {...getDividerProps()} />;
});

Divider.displayName = "NextUI.Divider";

export default Divider;
