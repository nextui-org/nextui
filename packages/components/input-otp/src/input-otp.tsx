import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";
import {OTPInput} from "input-otp";

import {UseInputOtpProps, useInputOtp} from "./use-input-otp";
import {InputOtpProvider} from "./input-otp-context";
import {InputOtpSegment} from "./input-otp-segment";

export interface InputOtpProps extends UseInputOtpProps {}

const InputOtp = forwardRef<"input", InputOtpProps>((props, ref) => {
  const context = useInputOtp({...props, ref});

  const {
    Component,
    hasHelper,
    isInvalid,
    errorMessage,
    description,
    isFocusVisible,
    isFocused,
    getBaseProps,
    getInputOtpProps,
    getSegmentWrapperProps,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  } = context;

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
        <OTPInput
          {...getInputOtpProps()}
          render={({slots}) => (
            <div {...getSegmentWrapperProps()}>
              {slots.map((slot, idx) => (
                <InputOtpSegment
                  key={idx}
                  {...slot}
                  isFocusVisible={isFocusVisible}
                  isFocused={isFocused}
                />
              ))}
            </div>
          )}
        />
        {helperSection}
      </Component>
    </InputOtpProvider>
  );
});

InputOtp.displayName = "NextUI.InputOtp";

export default InputOtp;
