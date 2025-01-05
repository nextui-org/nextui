import type {
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
} from "@nextui-org/modal";

import {ModalHeader, ModalBody, ModalFooter, ModalContent} from "@nextui-org/modal";

import Drawer from "./drawer";

// export types
export type {DrawerProps} from "./drawer";
export type {
  ModalContentProps as DrawerContentProps,
  ModalHeaderProps as DrawerHeaderProps,
  ModalBodyProps as DrawerBodyProps,
  ModalFooterProps as DrawerFooterProps,
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
