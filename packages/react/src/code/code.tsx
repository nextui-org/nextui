import React from "react";

import {CSS} from "../theme/stitches.config";

import {StyledCode, StyledPre, CodeVariantsProps} from "./code.styles";

interface Props {
  block?: boolean;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CodeProps = Props & NativeAttrs & CodeVariantsProps & {css?: CSS};

const Code: React.FC<CodeProps> = ({block = false, children, ...props}) => {
  if (!block) return <StyledCode {...props}>{children}</StyledCode>;

  return (
    <StyledPre {...props}>
      <StyledCode>{children}</StyledCode>
    </StyledPre>
  );
};

Code.toString = () => ".nextui-code";

const MemoCode = React.memo(Code);

export default MemoCode;
