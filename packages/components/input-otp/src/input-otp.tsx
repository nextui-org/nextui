import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";
import {OTPInput} from "input-otp";
import {clsx} from "@nextui-org/shared-utils";

import {UseInputOtpProps, useInputOtp} from "./use-input-otp";
import {InputOtpProvider} from "./input-otp-context";
import {InputOtpSegment} from "./input-otp-segment";

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
    slots,
    classNames,
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

  const wrapperStyles = clsx(classNames?.wrapper);

  return (
    <InputOtpProvider value={context}>
      <Component {...getBaseProps()}>
        <OTPInput
          containerClassName={clsx(slots.wrapper?.({class: wrapperStyles}))}
          maxLength={length}
          minLength={length}
          render={({slots}) => (
            <div {...getSegmentWrapperProps()}>
              {slots.map((slot, idx) => (
                <InputOtpSegment key={idx} {...slot} />
              ))}
            </div>
          )}
          {...getInputOtpProps()}
          data-slot="input"
          role="textbox"
        />
        {helperSection}
      </Component>
    </InputOtpProvider>
  );
});

InputOtp.displayName = "NextUI.InputOtp";

export default InputOtp;
