import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";

import {UseInputOtpProps, useInputOtp} from "./use-input-otp";
import {InputOtpSegment} from "./input-otp-segment";

export interface InputOtpProps extends UseInputOtpProps {}

const InputOtp = forwardRef<"div", InputOtpProps>((props, ref) => {
  const {
    Component,
    otplength,
    domRef,
    styles,
    value,
    isInputFocused,
    values,
    hasHelper,
    isInvalid,
    errorMessage,
    description,
    getBaseProps,
    getInputWrapperProps,
    getInputProps,
    getSegmentWrapperProps,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
    ...otherProps
  } = useInputOtp({
    ...props,
    ref,
  });

  const segmentsSection = useMemo(() => {
    return (
      <div {...getSegmentWrapperProps()}>
        {Array.from(Array(otplength)).map((_, idx) => (
          <InputOtpSegment
            key={"segment-" + idx}
            accessorIndex={idx}
            classNames={values.classNames}
            isInputFocused={isInputFocused}
            otplength={otplength}
            slots={values.slots}
            value={value}
          />
        ))}
      </div>
    );
  }, [otplength, values.classNames, values.slots, isInputFocused, value, getSegmentWrapperProps]);

  const inputSection = useMemo(() => {
    return (
      <div {...getInputWrapperProps()}>
        <input {...getInputProps()} />
      </div>
    );
  }, [getInputWrapperProps, getInputProps]);

  const helperSection = useMemo(() => {
    if (!hasHelper) {
      return null;
    }

    return (
      <div {...getHelperWrapperProps()}>
        {isInvalid && errorMessage ? (
          <div {...getErrorMessageProps()}>{errorMessage}</div>
        ) : (
          <div {...getDescriptionProps()}>{description}</div>
        )}
      </div>
    );
  }, [
    hasHelper,
    isInvalid,
    errorMessage,
    description,
    getHelperWrapperProps,
    getErrorMessageProps,
  ]);

  return (
    <Component ref={domRef} className={styles} {...otherProps} {...getBaseProps()}>
      {segmentsSection}
      {inputSection}
      {helperSection}
    </Component>
  );
});

InputOtp.displayName = "NextUI.InputOtp";

export default InputOtp;
