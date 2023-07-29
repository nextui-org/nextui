import {forwardRef} from "@nextui-org/system";

import {useCode, UseCodeProps} from "./use-code";

export interface CodeProps extends UseCodeProps {}

const Code = forwardRef<"div", CodeProps>((props, ref) => {
  const {Component, children, getCodeProps} = useCode({...props, ref});

  return <Component {...getCodeProps()}>{children}</Component>;
});

Code.displayName = "NextUI.Code";

export default Code;
