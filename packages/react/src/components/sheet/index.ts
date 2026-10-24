import type {ComponentProps} from "react";

import {
  SheetBackdrop,
  SheetBody,
  SheetClose,
  SheetCloseTrigger,
  SheetContent,
  SheetDialog,
  SheetFooter,
  SheetHandle,
  SheetHeader,
  SheetHeading,
  SheetNestedRoot,
  SheetRoot,
  SheetTrigger,
} from "./sheet";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Sheet = Object.assign(SheetRoot, {
  Backdrop: SheetBackdrop,
  Body: SheetBody,
  Close: SheetClose,
  CloseTrigger: SheetCloseTrigger,
  Content: SheetContent,
  Dialog: SheetDialog,
  Footer: SheetFooter,
  Handle: SheetHandle,
  Header: SheetHeader,
  Heading: SheetHeading,
  NestedRoot: SheetNestedRoot,
  Root: SheetRoot,
  Trigger: SheetTrigger,
});

export type Sheet = {
  Props: ComponentProps<typeof SheetRoot>;
  RootProps: ComponentProps<typeof SheetRoot>;
  NestedRootProps: ComponentProps<typeof SheetNestedRoot>;
  TriggerProps: ComponentProps<typeof SheetTrigger>;
  CloseProps: ComponentProps<typeof SheetClose>;
  BackdropProps: ComponentProps<typeof SheetBackdrop>;
  ContentProps: ComponentProps<typeof SheetContent>;
  DialogProps: ComponentProps<typeof SheetDialog>;
  HeaderProps: ComponentProps<typeof SheetHeader>;
  HeadingProps: ComponentProps<typeof SheetHeading>;
  BodyProps: ComponentProps<typeof SheetBody>;
  FooterProps: ComponentProps<typeof SheetFooter>;
  HandleProps: ComponentProps<typeof SheetHandle>;
  CloseTriggerProps: ComponentProps<typeof SheetCloseTrigger>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  SheetRoot,
  SheetNestedRoot,
  SheetTrigger,
  SheetClose,
  SheetBackdrop,
  SheetContent,
  SheetDialog,
  SheetHeader,
  SheetHeading,
  SheetBody,
  SheetFooter,
  SheetHandle,
  SheetCloseTrigger,
};

export type {
  SheetRootProps,
  SheetRootProps as SheetProps,
  SheetRootProps as SheetNestedRootProps,
  SheetTriggerProps,
  SheetCloseProps,
  SheetBackdropProps,
  SheetContentProps,
  SheetDialogProps,
  SheetHeaderProps,
  SheetHeadingProps,
  SheetBodyProps,
  SheetFooterProps,
  SheetHandleProps,
  SheetCloseTriggerProps,
} from "./sheet";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {sheetVariants} from "@heroui/styles";

export type {SheetVariants} from "@heroui/styles";
