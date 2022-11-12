import React, {useRef, useImperativeHandle} from "react";

import {CSS} from "../theme/stitches.config";
import clsx from "../utils/clsx";

import {useTableContext} from "./table-context";
import {StyledTableFooter, TableFooterVatiantsProps} from "./table.styles";

type Props = {
  children?: React.ReactNode;
};

type NativeAttrs = React.HTMLAttributes<unknown>;

export type TableFooterProps = Props & NativeAttrs & TableFooterVatiantsProps & {css?: CSS};

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({children, ...props}, ref: React.Ref<HTMLTableSectionElement | null>) => {
    const tableFooterRef = useRef<HTMLTableSectionElement | null>(null);

    useImperativeHandle(ref, () => tableFooterRef?.current);

    const {footerAlign} = useTableContext();

    return (
      <StyledTableFooter
        ref={tableFooterRef}
        align={props.align || footerAlign}
        className={clsx("nextui-table-footer", props.className)}
        role="rowgroup"
        {...props}
      >
        {children}
      </StyledTableFooter>
    );
  },
);

TableFooter.displayName = "NextUI.TableFooter";

TableFooter.toString = () => ".nextui-table-footer";

export default TableFooter;
