import {HTMLNextUIProps, forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {__DEV__} from "@nextui-org/shared-utils";

import {StyledSpacer} from "./spacer.styles";
import {useSpacer, UseSpacerProps} from "./use-spacer";

export interface SpacerProps extends HTMLNextUIProps<"span", UseSpacerProps> {
  /**
   * Whether should have inline space
   */
  inline?: boolean;
}

const Spacer = forwardRef<SpacerProps, "span">((props, ref) => {
  const domRef = useDOMRef(ref);

  const {x, y, inline = false, css, ...otherProps} = props;

  const {getSpacerCss} = useSpacer({x, y});

  return (
    <StyledSpacer
      ref={domRef}
      aria-hidden="true"
      css={{
        ...getSpacerCss(),
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
