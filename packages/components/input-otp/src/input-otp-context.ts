import {createContext} from "@nextui-org/react-utils";

import {UseInputOtpReturn} from "./use-input-otp";

export const [InputOtpProvider, useInputOtpContext] = createContext<UseInputOtpReturn>({
  name: "InputOtpContext",
  errorMessage:
    "useInputOtpContext: `context` is undefined. Seems like you forgot to wrap all input-otp components within `<InputOtp />`",
});
