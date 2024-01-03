import {ReactNode} from "react";
import {AnimatePresence} from "framer-motion";
import {Overlay} from "@react-aria/overlays";
import {forwardRef} from "@nextui-org/system";

import {UseDrawerProps, useDrawer} from "./use-drawer";
import {DrawerProvider} from "./drawer-context";

export interface DrawerProps extends UseDrawerProps {
  /**
   * The content of the drawer. Usually the DrawerContent
   */
  children: ReactNode;
}

const Drawer = forwardRef<"div", DrawerProps>((props, ref) => {
  const {children, ...otherProps} = props;
  const context = useDrawer({...otherProps, ref});

  const overlay = <Overlay portalContainer={context.portalContainer}>{children}</Overlay>;

  return (
    <DrawerProvider value={context}>
      {context.disableAnimation && context.isOpen ? (
        overlay
      ) : (
        <AnimatePresence>{context.isOpen ? overlay : null}</AnimatePresence>
      )}
    </DrawerProvider>
  );
});

Drawer.displayName = "NextUI.Drawer";

export default Drawer;
