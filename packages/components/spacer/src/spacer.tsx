import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {__DEV__} from "@nextui-org/shared-utils";

import {StyledSpacer} from "./spacer.styles";
import {useSpacer, UseSpacerProps} from "./use-spacer";

export interface SpacerProps extends UseSpacerProps {}

const Spacer = forwardRef<SpacerProps, "span">((props, ref) => {
  const {spacerCss, inline, css, ...otherProps} = useSpacer(props);

  const domRef = useDOMRef(ref);

  return (
    <StyledSpacer
      ref={domRef}
      aria-hidden="true"
      css={{
        ...spacerCss,
        ...css,
      }}
      inline={inline}
      {...otherProps}
    />
  );
});

if (__DEV__) {
  Spacer.displayName = "NextUI.Spacer";
}

Spacer.toString = () => ".nextui-spacer";

export default Spacer;
