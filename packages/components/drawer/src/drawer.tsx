import {forwardRef} from "@nextui-org/system";
import {Modal} from "@nextui-org/modal";

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

Drawer.displayName = "NextUI.Drawer";

export default Drawer;
