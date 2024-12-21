import type {AriaButtonProps} from "@react-types/button";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {Button} from "@nextui-org/button";

export interface Props extends Omit<HTMLNextUIProps<"button">, keyof AriaButtonProps> {
  direction: "up" | "down";
}

export type NumberFieldVerticalStepperProps = Props & AriaButtonProps;

const StepperUpIcon = () => (
  <svg fill="none" height="6" viewBox="0 0 10 6" width="10" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 5L5.70707 1.55482C5 0.815059 5 0.815061 4.29293 1.55482L1 5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
  </svg>
);

const StepperDownIcon = () => (
  <svg fill="none" height="6" viewBox="0 0 10 6" width="10" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 1L5.70707 4.44518C5 5.18494 5 5.18494 4.29293 4.44518L1 1"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
  </svg>
);

const NumberFieldVerticalStepper = forwardRef<"button", NumberFieldVerticalStepperProps>(
  (props) => {
    const {direction, ...otherProps} = props;

    return (
      <Button isIconOnly {...otherProps}>
        {direction == "up" ? <StepperUpIcon /> : <StepperDownIcon />}
      </Button>
    );
  },
);

NumberFieldVerticalStepper.displayName = "NextUI.NumberFieldVerticalStepper";

export default NumberFieldVerticalStepper;
