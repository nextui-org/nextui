import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";

import {useCode, UseCodeProps} from "./use-code";

export interface CodeProps extends Omit<UseCodeProps, "ref"> {}

const Code = forwardRef<CodeProps, "code">((props, ref) => {
  const {Component, domRef, children, styles, ...otherProps} = useCode({ref, ...props});

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {children}
    </Component>
  );
});

if (__DEV__) {
  Code.displayName = "NextUI.Code";
}

export default Code;
