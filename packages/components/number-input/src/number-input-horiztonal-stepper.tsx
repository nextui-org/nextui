import type {AriaButtonProps} from "@react-types/button";
import type {ButtonProps} from "@heroui/button";

import {Button} from "@heroui/button";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroui/shared-icons";

interface NumberInputHorizontalStepperProps extends Omit<ButtonProps, keyof AriaButtonProps> {
  direction: "left" | "right";
}

const NumberInputHorizontalStepper = ({
  direction,
  ...otherProps
}: NumberInputHorizontalStepperProps) => {
  return (
    <Button isIconOnly {...otherProps}>
      {direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </Button>
  );
};

NumberInputHorizontalStepper.displayName = "HeroUI.NumberInputHorizontalStepper";

export default NumberInputHorizontalStepper;
