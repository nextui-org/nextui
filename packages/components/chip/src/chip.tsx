"use client";

import {forwardRef} from "@nextui-org/system";
import {CloseFilledIcon} from "@nextui-org/shared-icons";
import {useMemo} from "react";

import {UseChipProps, useChip} from "./use-chip";

export interface ChipProps
  extends Omit<UseChipProps, "ref" | "isOneChar" | "isCloseButtonFocusVisible"> {}

const Chip = forwardRef<ChipProps, "div">((props, ref) => {
  const {
    Component,
    children,
    slots,
    styles,
    isDot,
    isCloseable,
    leftContent,
    rightContent,
    getCloseButtonProps,
    getChipProps,
  } = useChip({
    ref,
    ...props,
  });

  const left = useMemo(() => {
    if (isDot && !leftContent) {
      return <span className={slots.dot({class: styles?.dot})} />;
    }

    return leftContent;
  }, [slots, leftContent, isDot]);

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
      {left}
      <span className={slots.content({class: styles?.content})}>{children}</span>
      {right}
    </Component>
  );
});

Chip.displayName = "NextUI.Chip";

export default Chip;
