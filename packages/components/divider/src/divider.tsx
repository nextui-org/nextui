import {forwardRef} from "@nextui-org/system";

import {UseDividerProps, useDivider} from "./use-divider";

export interface DividerProps extends Omit<UseDividerProps, "children"> {}

const Divider = forwardRef<DividerProps, "hr">((props, ref) => {
  const {Component, getDividerProps} = useDivider({ref, ...props});

  return <Component {...getDividerProps()} />;
});

Divider.displayName = "NextUI.Divider";

export default Divider;
