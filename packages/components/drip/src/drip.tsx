import type {DripSlots, SlotsToClasses} from "@nextui-org/theme";

import {useEffect} from "react";
import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {drip} from "@nextui-org/theme";

export interface DripProps extends HTMLNextUIProps<"div"> {
  isVisible?: boolean;
  x: number;
  y: number;
  color?: string;
  onCompleted: () => void;
  /**
   * Classname or List of classes to change the styles of the avatar.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Drip styles={{
   *    base:"base-classes",
   *    svg: "svg-classes",
   * }} />
   * ```
   */
  styles?: SlotsToClasses<DripSlots>;
}

const Drip = forwardRef<DripProps, "div">((props, ref) => {
  const {isVisible, x, y, color, onCompleted, styles, className, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const slots = drip();
  const baseStyles = clsx(styles?.base, className);

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
    <div ref={domRef} className={slots.base({class: baseStyles})} {...otherProps}>
      <svg
        className={slots.svg({class: styles?.svg})}
        height="20%"
        style={{top, left}}
        viewBox="0 0 20 20"
        width="20%"
      >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill={color || "currentColor"}>
            <rect height="100%" rx="10" width="100%" />
          </g>
        </g>
      </svg>
    </div>
  );
});

if (__DEV__) {
  Drip.displayName = "NextUI.Drip";
}

export default Drip;
