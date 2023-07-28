import {forwardRef} from "@nextui-org/system";

import {UseSpacerProps, useSpacer} from "./use-spacer";

export interface SpacerProps extends UseSpacerProps {}

const Spacer = forwardRef<"span", SpacerProps>((props, ref) => {
  const {Component, getSpacerProps} = useSpacer({...props, ref});

  return <Component {...getSpacerProps()} />;
});

Spacer.displayName = "NextUI.Spacer";

export default Spacer;
