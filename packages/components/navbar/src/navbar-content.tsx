import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";

import {useNavbarContext} from "./navbar-context";

export interface NavbarContentProps extends HTMLNextUIProps<"ul"> {
  /**
   * The content of the Navbar.Content. It is usually the `NavbarItem`,
   */
  children?: React.ReactNode | React.ReactNode[];
}

const NavbarContent = forwardRef<NavbarContentProps, "ul">((props, ref) => {
  const {as, className, children, ...otherProps} = props;

  const Component = as || "ul";
  const domRef = useDOMRef(ref);

  const {slots, classNames} = useNavbarContext();

  const styles = clsx(classNames?.content, className);

  return (
    <Component ref={domRef} className={slots.content?.({class: styles})} {...otherProps}>
      {children}
    </Component>
  );
});

NavbarContent.displayName = "NextUI.NavbarContent";

export default NavbarContent;
