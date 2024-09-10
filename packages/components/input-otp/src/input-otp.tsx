import {forwardRef} from "@nextui-org/system";

import {UseInputOtpProps, useInputOtp} from "./use-input-otp";

export interface InputOtpProps extends UseInputOtpProps {}

const InputOtp = forwardRef<"div", InputOtpProps>((props, ref) => {
  const {Component, domRef, children, styles, ...otherProps} = useInputOtp({...props, ref});

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {children}
    </Component>
  );
});

InputOtp.displayName = "NextUI.InputOtp";

export default InputOtp;
