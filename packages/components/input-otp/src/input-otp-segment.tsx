import {SlotProps} from "input-otp";
import {useMemo} from "react";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {cn} from "@nextui-org/theme";

import {useInputOtpContext} from "./input-otp-context";

export const InputOtpSegment = ({
  ...props
}: SlotProps & {isFocused?: boolean; isFocusVisible?: boolean}) => {
  const {classNames, slots, type} = useInputOtpContext();

  const passwordCharStyles = clsx(classNames?.passwordChar);
  const caretStyles = clsx(classNames?.caret);
  const segmentStyles = clsx(classNames?.segment);

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
      data-focus={dataAttr(props.isFocused && props.isActive)}
      data-focus-visible={dataAttr(props.isFocusVisible && props.isActive)}
      data-has-value={dataAttr(!!props.char)}
      data-slot="segment2"
      role="presentation"
    >
      {displayValue}
    </div>
  );
};
