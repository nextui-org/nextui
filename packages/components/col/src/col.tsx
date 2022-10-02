import {HTMLNextUIProps, forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {StyledCol} from "./col.styles";

export interface ColProps extends HTMLNextUIProps<"div"> {
  span?: number;
  offset?: number;
}

const Col = forwardRef<ColProps, "div">((props, ref) => {
  const {span = 12, offset = 0, css, children, className, ...otherProps} = props;
  const domRef = useDOMRef(ref);

  return (
    <StyledCol
      ref={domRef}
      className={clsx("nextui-col", className)}
      css={{
        width: `${(100 / 12) * span}%`,
        marginLeft: `${(100 / 12) * offset}%`,
        ...css,
      }}
      {...otherProps}
    >
      {children}
    </StyledCol>
  );
});

if (__DEV__) {
  Col.displayName = "NextUI.Col";
}

Col.toString = () => ".nextui-col";

export default Col;
