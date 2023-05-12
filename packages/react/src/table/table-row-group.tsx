import React from "react";
import {useTableRowGroup} from "@react-aria/table";

import {CSS} from "../theme/stitches.config";
import clsx from "../utils/clsx";

import {StyledTableRowGroup, TableRowGroupVariants} from "./table.styles";

interface Props {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type TableRowGroupProps = Props & TableRowGroupVariants & NativeAttrs & {css?: CSS};

const TableRowGroup: React.FC<TableRowGroupProps> = ({children, as = "thead", ...props}) => {
  const {
    rowGroupProps,
  }: {
    rowGroupProps: Omit<React.HTMLAttributes<unknown>, keyof TableRowGroupProps>;
  } = useTableRowGroup();

  return (
    <StyledTableRowGroup
      as={as}
      className={clsx("nextui-table-row-group", props.className)}
      {...props}
      {...rowGroupProps}
    >
      {children}
    </StyledTableRowGroup>
  );
};

export default TableRowGroup;
