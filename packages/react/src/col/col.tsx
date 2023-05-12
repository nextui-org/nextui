import type {CSS} from "../theme/stitches.config";

import React from "react";

import StyledCol, {ColVariantsProps} from "./col.styles";

interface Props {
  span?: number;
  offset?: number;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ColProps = Props & ColVariantsProps & NativeAttrs;

const Col: React.FC<ColProps> = ({children, span = 12, offset = 0, css, ...props}) => {
  return (
    <StyledCol
      css={{
        width: `${(100 / 12) * span}%`,
        marginLeft: `${(100 / 12) * offset}%`,
        ...css,
      }}
      {...props}
    >
      {children}
    </StyledCol>
  );
};

Col.toString = () => ".nextui-column";

const MemoCol = React.memo(Col);

export default MemoCol;
