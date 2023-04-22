import {forwardRef} from "@nextui-org/system";

import {UseSpacerProps, useSpacer} from "./use-spacer";

export interface SpacerProps extends Omit<UseSpacerProps, "ref"> {}

const Spacer = forwardRef<SpacerProps, "span">((props, ref) => {
  const {Component, getSpacerProps} = useSpacer({ref, ...props});

  return <Component {...getSpacerProps()} />;
});

Spacer.displayName = "NextUI.Spacer";

export default Spacer;
