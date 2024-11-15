import {SlotProps} from "input-otp";
import {useMemo} from "react";
import {dataAttr} from "@nextui-org/shared-utils";
import {cn} from "@nextui-org/theme";

import {useInputOtpContext} from "./input-otp-context";

export const InputOtpSegment = (props: SlotProps) => {
  const {classNames, slots, type} = useInputOtpContext();

  const passwordCharStyles = cn(classNames?.passwordChar);
  const caretStyles = cn(classNames?.caret);
  const segmentStyles = cn(classNames?.segment);

  const displayValue = useMemo(() => {
    if (props.isActive && !props.char) {
      return <div className={cn(slots.caret?.({class: caretStyles}))} />;
    }
    if (props.char) {
      return type === "password" ? (
        <div className={cn(slots.passwordChar?.({class: passwordCharStyles}))} />
      ) : (
        <div>{props.char}</div>
      );
    }

    return <div>{props.placeholderChar}</div>;
  }, [props.char, props.isActive, props.placeholderChar, type]);

  return (
    <div
      className={cn(slots.segment?.({class: segmentStyles}))}
      data-active={dataAttr(props.isActive)}
      data-has-value={dataAttr(!!props.char)}
      data-slot="segment"
      role="presentation"
    >
      {displayValue}
    </div>
  );
};
