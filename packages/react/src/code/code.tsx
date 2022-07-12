import React from "react";

import withDefaults from "../utils/with-defaults";
import {CSS} from "../theme/stitches.config";

import {StyledCode, StyledPre, CodeVariantsProps} from "./code.styles";

interface Props {
  block?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  block: false,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CodeProps = Props & NativeAttrs & CodeVariantsProps & {css?: CSS};

const Code: React.FC<React.PropsWithChildren<CodeProps>> = ({block, children, ...props}) => {
  if (!block) return <StyledCode {...props}>{children}</StyledCode>;

  return (
    <StyledPre {...props}>
      <StyledCode>{children}</StyledCode>
    </StyledPre>
  );
};

Code.toString = () => ".nextui-code";

const MemoCode = React.memo(Code);

export default withDefaults(MemoCode, defaultProps);
