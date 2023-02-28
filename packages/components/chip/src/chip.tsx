import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";
import {CloseFilledIcon} from "@nextui-org/shared-icons";
import {useMemo} from "react";

import {UseChipProps, useChip} from "./use-chip";

export interface ChipProps extends Omit<UseChipProps, "ref"> {}

const Chip = forwardRef<ChipProps, "div">((props, ref) => {
  const {
    Component,
    children,
    slots,
    styles,
    isCloseable,
    leftContent,
    rightContent,
    getCloseButtonProps,
    getChipProps,
  } = useChip({
    ref,
    ...props,
  });

  const right = useMemo(() => {
    if (isCloseable) {
      return (
        <span {...getCloseButtonProps()}>{!rightContent ? <CloseFilledIcon /> : rightContent}</span>
      );
    }

    return rightContent;
  }, [rightContent, isCloseable, getCloseButtonProps]);

  return (
    <Component {...getChipProps()}>
      {leftContent}
      <label className={slots.label({class: styles?.label})}>{children}</label>
      {right}
    </Component>
  );
});

if (__DEV__) {
  Chip.displayName = "NextUI.Chip";
}

export default Chip;
