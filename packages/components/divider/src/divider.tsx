import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {Text} from "@nextui-org/text";

import {StyledDivider} from "./divider.styles";
import {UseDividerProps, useDivider} from "./use-divider";

export interface DividerProps extends UseDividerProps {}

const Divider = forwardRef<DividerProps, "div">((props, ref) => {
  const {css, children, dividerCss, alignCss, textProps, className, ...otherProps} =
    useDivider(props);

  const domRef = useDOMRef(ref);

  const {css: textCss, ...otherTextProps} = textProps;

  return (
    <StyledDivider
      ref={domRef}
      className={clsx("nextui-divider", className)}
      css={{
        ...dividerCss,
        ...css,
      }}
      role="separator"
      {...otherProps}
    >
      {children && (
        <Text
          css={{
            ...alignCss,
            ...textCss,
          }}
          {...otherTextProps}
        />
      )}
    </StyledDivider>
  );
});

if (__DEV__) {
  Divider.displayName = "NextUI.Divider";
}

Divider.toString = () => ".nextui-divider";

export default Divider;
