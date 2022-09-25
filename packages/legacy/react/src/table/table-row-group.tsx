import React from "react";
import {useTableRowGroup} from "@react-aria/table";

import {CSS} from "../theme/stitches.config";
import withDefaults from "../utils/with-defaults";
import clsx from "../utils/clsx";

import {StyledTableRowGroup, TableRowGroupVariants} from "./table.styles";

interface Props {
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  as: "thead",
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type TableRowGroupProps = Props & TableRowGroupVariants & NativeAttrs & {css?: CSS};

const TableRowGroup: React.FC<React.PropsWithChildren<TableRowGroupProps>> = ({
  children,
  ...props
}) => {
  const {
    rowGroupProps,
  }: {
    rowGroupProps: Omit<React.HTMLAttributes<unknown>, keyof TableRowGroupProps>;
  } = useTableRowGroup();

  return (
    <StyledTableRowGroup
      className={clsx("nextui-table-row-group", props.className)}
      {...props}
      {...rowGroupProps}
    >
      {children}
    </StyledTableRowGroup>
  );
};

export default withDefaults(TableRowGroup, defaultProps);
