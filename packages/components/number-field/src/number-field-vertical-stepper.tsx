import type {AriaButtonProps} from "@react-types/button";
import type {ButtonProps} from "@nextui-org/button";

import {Button} from "@nextui-org/button";
import {ChevronUpIcon, ChevronDownIcon} from "@nextui-org/shared-icons";

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
