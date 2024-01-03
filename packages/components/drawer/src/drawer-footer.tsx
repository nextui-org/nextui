import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx} from "@nextui-org/shared-utils";

import {useDrawerContext} from "./drawer-context";

export interface DrawerFooterProps extends HTMLNextUIProps<"footer"> {}

const DrawerFooter = forwardRef<"footer", DrawerFooterProps>((props, ref) => {
  const {as, children, className, ...otherProps} = props;

  const {slots, classNames} = useDrawerContext();

  const domRef = useDOMRef(ref);

  const Component = as || "footer";

  return (
    <Component
      ref={domRef}
      className={slots.footer({class: clsx(classNames?.footer, className)})}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

DrawerFooter.displayName = "NextUI.DrawerFooter";

export default DrawerFooter;
