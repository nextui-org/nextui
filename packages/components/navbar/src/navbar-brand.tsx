import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx} from "@nextui-org/shared-utils";
import * as React from "react";

import {useNavbarContext} from "./navbar-context";

export interface NavbarBrandProps extends HTMLNextUIProps<"div"> {
  children?: React.ReactNode | React.ReactNode[];
}

const NavbarBrand = forwardRef<"div", NavbarBrandProps>((props, ref) => {
  const {as, className, children, ...otherProps} = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const {slots, classNames} = useNavbarContext();

  const styles = clsx(classNames?.brand, className);

  return (
    <>
      {React.createElement(
        Component,
        {ref: domRef, className: slots.brand?.({class: styles}), ...otherProps},
        <>{children}</>,
      )}
    </>
  );
});

NavbarBrand.displayName = "NextUI.NavbarBrand";

export default NavbarBrand;
