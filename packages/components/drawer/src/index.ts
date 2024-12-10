import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  UseDisclosureProps,
} from "@nextui-org/modal";

import Drawer from "./drawer";

// export types
export type {DrawerProps} from "./drawer";
export type {
  ModalContentProps as DrawerContentProps,
  ModalHeaderProps as DrawerHeaderProps,
  ModalBodyProps as DrawerBodyProps,
  ModalFooterProps as DrawerFooterProps,
  UseDisclosureProps,
};

// export hooks
export {useDrawer} from "./use-drawer";

// export component
export {Drawer};

// export subcomponents
export {
  ModalHeader as DrawerHeader,
  ModalBody as DrawerBody,
  ModalFooter as DrawerFooter,
  ModalContent as DrawerContent,
};
