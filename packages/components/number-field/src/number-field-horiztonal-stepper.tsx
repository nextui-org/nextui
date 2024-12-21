import type {AriaButtonProps} from "@react-types/button";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {Button} from "@nextui-org/button";

export interface Props extends Omit<HTMLNextUIProps<"button">, keyof AriaButtonProps> {
  direction: "left" | "right";
}

export type NumberFieldHorizontalStepperProps = Props & AriaButtonProps;

const StepperLeftIcon = () => (
  <svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 9L1.55482 5.70707C0.815058 5 0.815061 5 1.55482 4.29293L5 1"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
  </svg>
);

const StepperRightIcon = () => (
  <svg fill="none" height="10" viewBox="0 0 6 10" width="6" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 9L4.44518 5.70707C5.18494 5 5.18494 5 4.44518 4.29293L1 1"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
  </svg>
);

const NumberFieldHorizontalStepper = forwardRef<"button", NumberFieldHorizontalStepperProps>(
  (props) => {
    const {direction, ...otherProps} = props;

    return (
      <Button isIconOnly {...otherProps}>
        {direction == "left" ? <StepperLeftIcon /> : <StepperRightIcon />}
      </Button>
    );
  },
);

NumberFieldHorizontalStepper.displayName = "NextUI.NumberFieldHorizontalStepper";

export default NumberFieldHorizontalStepper;
