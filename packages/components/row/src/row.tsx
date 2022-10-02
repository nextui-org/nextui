import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {useRow, UseRowProps} from "./use-row";
import {StyledRow} from "./row.styles";

export interface RowProps extends UseRowProps {}

const Row = forwardRef<RowProps, "div">((props, ref) => {
  const {rowCss, css, className, ...otherProps} = useRow(props);

  const domRef = useDOMRef(ref);

  return (
    <StyledRow
      ref={domRef}
      className={clsx("nextui-row", className)}
      css={{
        ...rowCss,
        ...css,
      }}
      {...otherProps}
    />
  );
});

if (__DEV__) {
  Row.displayName = "NextUI.Row";
}

Row.toString = () => ".nextui-row";

export default Row;
