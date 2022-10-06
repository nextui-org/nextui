import {HTMLNextUIProps, forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {StyledCode, StyledPre} from "./code.styles";

export interface CodeProps extends HTMLNextUIProps<"code"> {
  /**
   * Whether to show a <pre/> component as a wrapper.
   * @default false
   */
  block?: boolean;
}

const Code = forwardRef<CodeProps, "code">((props, ref) => {
  const {children, block = false, className, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  if (!block) {
    return (
      <StyledCode ref={domRef} className={clsx("nextui-code", className)} {...otherProps}>
        {children}
      </StyledCode>
    );
  }

  return (
    <StyledPre ref={domRef} className={clsx("nextui-code", className)} {...otherProps}>
      <StyledCode>{children}</StyledCode>
    </StyledPre>
  );
});

if (__DEV__) {
  Code.displayName = "NextUI.Code";
}

Code.toString = () => ".nextui-code";

export default Code;
