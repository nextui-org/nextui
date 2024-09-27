import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";

import {UseInputOtpProps, useInputOtp} from "./use-input-otp";
import {InputOtpSegment} from "./input-otp-segment";
import {InputOtpProvider} from "./input-otp-context";

export interface InputOtpProps extends UseInputOtpProps {}

const InputOtp = forwardRef<"div", InputOtpProps>((props, ref) => {
  const context = useInputOtp({...props, ref});

  const {
    Component,
    length,
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
  } = context;

  const segmentsSection = useMemo(() => {
    return (
      <div {...getSegmentWrapperProps()}>
        {Array.from(Array(length)).map((_, idx) => (
          <InputOtpSegment key={"segment-" + idx} accessorIndex={idx} />
        ))}
      </div>
    );
  }, [length, getSegmentWrapperProps]);

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
    getDescriptionProps,
  ]);

  return (
    <InputOtpProvider value={context}>
      <Component {...getBaseProps()}>
        <div>
          {segmentsSection}
          {inputSection}
          {helperSection}
        </div>
      </Component>
    </InputOtpProvider>
  );
});

InputOtp.displayName = "NextUI.InputOtp";

export default InputOtp;
