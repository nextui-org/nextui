import type {AriaButtonProps} from "@react-types/button";
import type {ButtonProps} from "@nextui-org/button";

import {Button} from "@nextui-org/button";
import {ChevronLeftIcon, ChevronRightIcon} from "@nextui-org/shared-icons";

interface NumberFieldHorizontalStepperProps extends Omit<ButtonProps, keyof AriaButtonProps> {
  direction: "left" | "right";
}

const NumberFieldHorizontalStepper = ({
  direction,
  ...otherProps
}: NumberFieldHorizontalStepperProps) => {
  return (
    <Button isIconOnly {...otherProps}>
      {direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </Button>
  );
};

NumberFieldHorizontalStepper.displayName = "NextUI.NumberFieldHorizontalStepper";

export default NumberFieldHorizontalStepper;
