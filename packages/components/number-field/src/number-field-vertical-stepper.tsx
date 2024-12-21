import type {AriaButtonProps} from "@react-types/button";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {Button} from "@nextui-org/button";
import {ChevronUpIcon, ChevronDownIcon} from "@nextui-org/shared-icons";

export interface Props extends Omit<HTMLNextUIProps<"button">, keyof AriaButtonProps> {
  direction: "up" | "down";
}

export type NumberFieldVerticalStepperProps = Props & AriaButtonProps;

const NumberFieldVerticalStepper = forwardRef<"button", NumberFieldVerticalStepperProps>(
  (props) => {
    const {direction, ...otherProps} = props;

    return (
      <Button isIconOnly {...otherProps}>
        {direction == "up" ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
    );
  },
);

NumberFieldVerticalStepper.displayName = "NextUI.NumberFieldVerticalStepper";

export default NumberFieldVerticalStepper;
