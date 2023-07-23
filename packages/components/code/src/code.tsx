import {forwardRef} from "react";

import {useCode, UseCodeProps} from "./use-code";

export interface CodeProps extends Omit<UseCodeProps, "ref"> {}

const Code = forwardRef<HTMLElement, CodeProps>((props, ref) => {
  const {Component, children, getCodeProps} = useCode({ref, ...props});

  return <Component {...getCodeProps()}>{children}</Component>;
});

Code.displayName = "NextUI.Code";

export default Code;
