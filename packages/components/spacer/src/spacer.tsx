import {forwardRef} from "react";

import {UseSpacerProps, useSpacer} from "./use-spacer";

export interface SpacerProps extends Omit<UseSpacerProps, "ref"> {}

const Spacer = forwardRef<HTMLElement, SpacerProps>((props, ref) => {
  const {Component, getSpacerProps} = useSpacer({ref, ...props});

  return <Component {...getSpacerProps()} />;
});

Spacer.displayName = "NextUI.Spacer";

export default Spacer;
