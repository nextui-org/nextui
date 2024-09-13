import {forwardRef} from "@nextui-org/system";

import {UseInputOtpProps, useInputOtp} from "./use-input-otp";
import {InputOtpSegment} from "./input-otp-segment";

export interface InputOtpProps extends UseInputOtpProps {}

const InputOtp = forwardRef<"div", InputOtpProps>((props, ref) => {
  const {
    Component,
    domRef,
    styles,
    value,
    isInputFocused,
    values,
    getBaseProps,
    getInputWrapperProps,
    getInputProps,
    getSegmentWrapperProps,
    ...otherProps
  } = useInputOtp({
    ...props,
    ref,
  });

  return (
    <Component ref={domRef} className={styles} {...otherProps} {...getBaseProps()}>
      <div {...getSegmentWrapperProps()}>
        <InputOtpSegment
          accessorIndex={0}
          classNames={values.classNames}
          isInputFocused={isInputFocused}
          slots={values.slots}
          value={value}
        />
        <InputOtpSegment
          accessorIndex={1}
          classNames={values.classNames}
          isInputFocused={isInputFocused}
          slots={values.slots}
          value={value}
        />
        <InputOtpSegment
          accessorIndex={2}
          classNames={values.classNames}
          isInputFocused={isInputFocused}
          slots={values.slots}
          value={value}
        />
        <InputOtpSegment
          accessorIndex={3}
          classNames={values.classNames}
          isInputFocused={isInputFocused}
          slots={values.slots}
          value={value}
        />
      </div>
      <div {...getInputWrapperProps()}>
        <input {...getInputProps()} />
      </div>
      <div />
    </Component>
  );
});

InputOtp.displayName = "NextUI.InputOtp";

export default InputOtp;
