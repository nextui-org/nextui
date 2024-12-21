import type {AriaButtonProps} from "@react-types/button";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {Button} from "@nextui-org/button";
import {ChevronLeftIcon, ChevronRightIcon} from "@nextui-org/shared-icons";

export interface Props extends Omit<HTMLNextUIProps<"button">, keyof AriaButtonProps> {
  direction: "left" | "right";
}

export type NumberFieldHorizontalStepperProps = Props & AriaButtonProps;

const NumberFieldHorizontalStepper = forwardRef<"button", NumberFieldHorizontalStepperProps>(
  (props) => {
    const {direction, ...otherProps} = props;

    return (
      <Button isIconOnly {...otherProps}>
        {direction == "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Button>
    );
  },
);

NumberFieldHorizontalStepper.displayName = "NextUI.NumberFieldHorizontalStepper";

export default NumberFieldHorizontalStepper;
