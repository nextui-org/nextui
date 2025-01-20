import type {AriaButtonProps} from "@react-types/button";
import type {ButtonProps} from "@heroui/button";

import {Button} from "@heroui/button";
import {ChevronUpIcon, ChevronDownIcon} from "@heroui/shared-icons";

export interface NumberInputVerticalStepperProps extends Omit<ButtonProps, keyof AriaButtonProps> {
  direction: "up" | "down";
}

const NumberInputVerticalStepper = ({
  direction,
  ...otherProps
}: NumberInputVerticalStepperProps) => {
  return (
    <Button isIconOnly {...otherProps}>
      {direction == "up" ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Button>
  );
};

NumberInputVerticalStepper.displayName = "HeroUI.NumberInputVerticalStepper";

export default NumberInputVerticalStepper;
