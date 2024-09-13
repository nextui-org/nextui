import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useMemo} from "react";

import {ValueTypes} from "./use-input-otp";

interface InputOtpSegmentProps extends HTMLNextUIProps<"div"> {
  otpLength: number;
  accessorIndex: number;
  value: string;
  isInputFocused: boolean;
  className?: string;
  classNames?: ValueTypes["classNames"];
  slots: ValueTypes["slots"];
}

export const InputOtpSegment = ({
  otpLength,
  accessorIndex,
  value,
  isInputFocused,
  className,
  classNames,
  slots,
}: InputOtpSegmentProps) => {
  const isActive = useMemo(
    () =>
      (value.length == accessorIndex ||
        (value.length == otpLength && accessorIndex == otpLength - 1)) &&
      isInputFocused,
    [value, isInputFocused],
  );

  const displayValue = useMemo(
    () => (value.length > accessorIndex ? value[accessorIndex] : null),
    [value],
  );

  const segmentStyles = clsx(className, classNames?.segment);

  return (
    <div
      className={clsx(slots.segment?.({class: segmentStyles}))}
      data-active={dataAttr(isActive)}
      data-slot="segment"
    >
      {displayValue}
    </div>
  );
};
