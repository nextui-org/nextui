import {forwardRef} from "@heroui/system";
import {Modal} from "@heroui/modal";

import {useDrawer, UseDrawerProps} from "./use-drawer";

export interface DrawerProps extends UseDrawerProps {
  children: React.ReactNode;
}

const Drawer = forwardRef<"div", DrawerProps>(({children, ...props}, ref) => {
  const {domRef, getModalProps} = useDrawer({...props, ref});

  return (
    <Modal ref={domRef} {...getModalProps()}>
      {children}
    </Modal>
  );
});

Drawer.displayName = "HeroUI.Drawer";

export default Drawer;
