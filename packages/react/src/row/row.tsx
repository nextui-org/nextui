import type {CSS} from "../theme/stitches.config";

import React from "react";

import {Justify, AlignItems, Wrap} from "../utils/prop-types";

import StyledRow, {RowVariantsProps} from "./row.styles";

interface Props {
  gap?: number;
  wrap?: Wrap;
  justify?: Justify;
  align?: AlignItems;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type RowProps = Props & NativeAttrs & RowVariantsProps;

const Row: React.FC<RowProps> = ({
  children,
  gap = 0,
  justify = "flex-start" as Justify,
  align = "flex-start" as AlignItems,
  wrap = "nowrap" as Wrap,
  css,
  ...props
}) => {
  return (
    <StyledRow
      css={{
        flexWrap: wrap,
        $$rowGap: `calc(${gap} * $space$lg)`,
        marginLeft: `calc(${gap} * $space$lg / 2)`,
        marginRight: `calc(${gap} * $space$lg / 2)`,
        justifyContent: justify,
        alignItems: align,
        ...css,
      }}
      {...props}
    >
      {children}
    </StyledRow>
  );
};

Row.toString = () => ".nextui-row";

const MemoRow = React.memo(Row);

export default MemoRow;
