import {SlotProps} from "input-otp";
import {useMemo} from "react";
import {clsx, dataAttr} from "@nextui-org/shared-utils";

import {useInputOtpContext} from "./input-otp-context";

export const InputOtpSegment = (props: SlotProps) => {
  const {classNames, slots, type} = useInputOtpContext();

  const passwordCharStyles = clsx(classNames?.passwordChar);
  const caretStyles = clsx(classNames?.caret);
  const segmentStyles = clsx(classNames?.segment);

  const displayValue = useMemo(() => {
    if (props.isActive && !props.char) {
      return <div className={clsx(slots.caret?.({class: caretStyles}))} />;
    }
    if (props.char) {
      return type === "password" ? (
        <div className={clsx(slots.passwordChar?.({class: passwordCharStyles}))} />
      ) : (
        <div>{props.char}</div>
      );
    }

    return <div>{props.placeholderChar}</div>;
  }, [props.char, props.isActive, type]);

  return (
    <div
      className={clsx(slots.segment?.({class: segmentStyles}))}
      data-active={dataAttr(props.isActive)}
      data-has-value={dataAttr(!!props.char)}
      data-slot="segment"
      role="presentation"
    >
      {displayValue}
    </div>
  );
};
