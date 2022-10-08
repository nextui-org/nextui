import {useEffect} from "react";
import {NextUI, forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {StyledDrip} from "./drip.styles";

export interface DripProps extends HTMLNextUIProps<"div"> {
  isVisible?: boolean;
  x: number;
  y: number;
  color?: string;
  onCompleted: () => void;
}

const Drip = forwardRef<DripProps, "div">((props, ref) => {
  const {isVisible, x, y, color, onCompleted, className, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const top = Number.isNaN(+y) ? 0 : y - 10;
  const left = Number.isNaN(+x) ? 0 : x - 10;

  useEffect(() => {
    let drip = domRef.current;

    if (!drip) return;
    drip.addEventListener("animationend", onCompleted);

    return () => {
      if (!drip) return;
      drip.removeEventListener("animationend", onCompleted);
    };
  });

  if (!isVisible) return null;

  return (
    <StyledDrip ref={domRef} className={clsx("nextui-drip", className)} {...otherProps}>
      <NextUI.Svg css={{top, left}} height="20" viewBox="0 0 20 20" width="20">
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g className="nextui-drip-filler" fill={color}>
            <rect height="100%" rx="10" width="100%" />
          </g>
        </g>
      </NextUI.Svg>
    </StyledDrip>
  );
});

if (__DEV__) {
  Drip.displayName = "NextUI.Drip";
}

Drip.toString = () => ".nextui-drip";

export default Drip;
