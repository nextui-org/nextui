import {CloseFilledIcon} from "@nextui-org/shared-icons";
import {useMemo, forwardRef} from "react";

import {UseChipProps, useChip} from "./use-chip";

export interface ChipProps
  extends Omit<UseChipProps, "ref" | "isOneChar" | "isCloseButtonFocusVisible"> {}

const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const {
    Component,
    children,
    slots,
    classNames,
    isDot,
    isCloseable,
    startContent,
    endContent,
    getCloseButtonProps,
    getChipProps,
  } = useChip({
    ref,
    ...props,
  });

  const start = useMemo(() => {
    if (isDot && !startContent) {
      return <span className={slots.dot({class: classNames?.dot})} />;
    }

    return startContent;
  }, [slots, startContent, isDot]);

  const end = useMemo(() => {
    if (isCloseable) {
      return <span {...getCloseButtonProps()}>{endContent || <CloseFilledIcon />}</span>;
    }

    return endContent;
  }, [endContent, isCloseable, getCloseButtonProps]);

  return (
    <Component {...getChipProps()}>
      {start}
      <span className={slots.content({class: classNames?.content})}>{children}</span>
      {end}
    </Component>
  );
});

Chip.displayName = "NextUI.Chip";

export default Chip;
