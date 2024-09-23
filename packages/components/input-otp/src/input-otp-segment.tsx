import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {HTMLNextUIProps} from "@nextui-org/system";
import {useMemo} from "react";

import {useInputOtpContext} from "./input-otp-context";

interface InputOtpSegmentProps extends HTMLNextUIProps<"div"> {
  accessorIndex: number;
}

export const InputOtpSegment = ({accessorIndex}: InputOtpSegmentProps) => {
  const {length, value, isInputFocused, classNames, slots, type} = useInputOtpContext();

  const isActive = useMemo(
    () =>
      (value.length == accessorIndex || (value.length == length && accessorIndex == length - 1)) &&
      isInputFocused,
    [value, isInputFocused],
  );
  const hasValue = useMemo(() => value.length > accessorIndex, [value, accessorIndex]);

  const segmentStyles = clsx(classNames?.segment);
  const caretStyles = clsx(classNames?.caret);
  const passwordCharStyles = clsx(classNames?.passwordChar);

  const displayValue = useMemo(() => {
    if (hasValue && type == "password") {
      return <div className={clsx(slots.passwordChar?.({class: passwordCharStyles}))} />;
    }

    if (hasValue) {
      return value[accessorIndex];
    }

    if (isActive) {
      return <div className={clsx(slots.caret?.({class: caretStyles}))} />;
    }

    return null;
  }, [type, hasValue, value, isActive]);

  return (
    <div
      className={clsx(slots.segment?.({class: segmentStyles}))}
      data-active={dataAttr(isActive)}
      data-has-value={dataAttr(hasValue)}
      data-slot="segment"
    >
      {displayValue}
    </div>
  );
};
