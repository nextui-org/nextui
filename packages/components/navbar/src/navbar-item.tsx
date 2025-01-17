import {forwardRef, HTMLHeroUIProps} from "@heroui/system";
import {useDOMRef} from "@heroui/react-utils";
import {clsx, dataAttr} from "@heroui/shared-utils";

import {useNavbarContext} from "./navbar-context";

export interface NavbarItemProps extends HTMLHeroUIProps<"li"> {
  children?: React.ReactNode;
  /**
   * Whether the item is active or not.
   * @default false
   */
  isActive?: boolean;
}

const NavbarItem = forwardRef<"li", NavbarItemProps>((props, ref) => {
  const {as, className, children, isActive, ...otherProps} = props;

  const Component = as || "li";
  const domRef = useDOMRef(ref);

  const {slots, classNames} = useNavbarContext();

  const styles = clsx(classNames?.item, className);

  return (
    <Component
      ref={domRef}
      className={slots.item?.({class: styles})}
      data-active={dataAttr(isActive)}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

NavbarItem.displayName = "HeroUI.NavbarItem";

export default NavbarItem;
