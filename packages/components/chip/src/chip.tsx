import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";

import {UseChipProps, useChip} from "./use-chip";

export interface ChipProps extends Omit<UseChipProps, "ref"> {}

const Chip = forwardRef<ChipProps, "div">((props, ref) => {
  const {Component, children, getChipProps} = useChip({
    ref,
    ...props,
  });

  return <Component {...getChipProps()}>{children}</Component>;
});

if (__DEV__) {
  Chip.displayName = "NextUI.Chip";
}

export default Chip;
