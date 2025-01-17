import type {AriaButtonProps} from "@react-types/button";
import type {ButtonProps} from "@heroui/button";

import {Button} from "@heroui/button";
import {ChevronUpIcon, ChevronDownIcon} from "@heroui/shared-icons";

export interface NumberFieldVerticalStepperProps extends Omit<ButtonProps, keyof AriaButtonProps> {
  direction: "up" | "down";
}

const NumberFieldVerticalStepper = ({
  direction,
  ...otherProps
}: NumberFieldVerticalStepperProps) => {
  return (
    <Button isIconOnly {...otherProps}>
      {direction == "up" ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Button>
  );
};

NumberFieldVerticalStepper.displayName = "NextUI.NumberFieldVerticalStepper";

export default NumberFieldVerticalStepper;
