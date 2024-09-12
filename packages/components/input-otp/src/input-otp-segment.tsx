import {clsx} from "@nextui-org/shared-utils";
import {HTMLNextUIProps} from "@nextui-org/system";

import {ValueTypes} from "./use-input-otp";

interface InputOtpSegmentProps extends HTMLNextUIProps<"div"> {
  accessorIndex: number;
  value: string;
  isInputFocused: boolean;
  className?: string;
  classNames?: ValueTypes["classNames"];
  slots: ValueTypes["slots"];
}

export const InputOtpSegment = ({
  accessorIndex,
  value,
  isInputFocused,
  className,
  classNames,
  slots,
}: InputOtpSegmentProps) => {
  let isActive = false;

  if (value.length == accessorIndex) {
    isActive = true;
  }
  if (value.length == 4 && accessorIndex == 3) {
    isActive = true;
  }

  const segmentStyles = clsx(className, classNames?.segment);

  return (
    <div
      className={clsx(
        slots.segment?.({class: segmentStyles}),
        isActive &&
          isInputFocused &&
          "transition scale-105 outline outline-2 outline-blue-300 border-none",
      )}
    >
      {value.length > accessorIndex ? value[accessorIndex] : ""}
    </div>
  );
};
