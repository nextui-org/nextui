"use client";

import type {SheetPlacement} from "./types";
import type {SheetVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactElement, ReactNode} from "react";
import type {SheetRenderProps} from "react-aria-components/Sheet";

import {sheetVariants} from "@heroui/styles";
import {mergeProps, mergeRefs} from "@react-aria/utils";
import React, {Suspense, isValidElement, useCallback, useMemo, useRef, useState} from "react";
import {Heading as HeadingPrimitive} from "react-aria-components/Dialog";
import {
  Sheet as AriaSheet,
  SheetBackdrop as AriaSheetBackdrop,
  SheetContent as AriaSheetContent,
  SheetOverlay as AriaSheetOverlay,
  SheetTrigger as AriaSheetTrigger,
} from "react-aria-components/Sheet";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {SurfaceContext} from "../surface";

import {SheetContext, useSheetContext} from "./context";
import {SheetLifecycle} from "./sheet-lifecycle";
import {useSheetHandleDrag} from "./use-sheet-handle-drag";

const STACK_ANIMATION = "heroui-sheet-scale-back";
const BACKDROP_ANIMATION = "heroui-sheet-backdrop";

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export type SheetRootProps = {
  children?: ReactNode;
  /** Controlled open state. */
  isOpen?: boolean;
  /** Initial open state when uncontrolled. @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Called when closing is requested. */
  onClose?: () => void;
  /** Called when the overlay finishes an enter or exit animation. */
  onAnimationEnd?: (open: boolean) => void;
  /** Whether clicking outside or swiping can close the sheet. @default true */
  isDismissable?: boolean;
  /** Which edge the sheet slides from. @default "bottom" */
  placement?: SheetPlacement;
  /**
   * Partial resting positions. Numbers are pixels. Strings are any CSS length.
   * Percentages are relative to the sheet. The sheet opens at the first value.
   * Full height is implicit, so a trailing `1` is ignored.
   */
  snapPoints?: Array<number | string>;
  /** Float the sheet away from the viewport edge. @default false */
  isDetached?: boolean;
  /** @internal Set by Sheet.NestedRoot. */
  isNested?: boolean;
};

/* -------------------------------------------------------------------------------------------------
 * Sheet Root
 * -----------------------------------------------------------------------------------------------*/

export function SheetRoot({
  children,
  defaultOpen = false,
  isDetached = false,
  isDismissable = true,
  isNested = false,
  isOpen: isOpenProp,
  onAnimationEnd,
  onClose,
  onOpenChange,
  placement = "bottom",
  snapPoints: snapPointsProp,
}: SheetRootProps) {
  const snapPoints = useMemo(() => normalizeSnapPoints(snapPointsProp), [snapPointsProp]);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isOpenProp ?? uncontrolledOpen;
  const setIsOpen = useCallback(
    (open: boolean) => {
      if (isOpenProp === undefined) setUncontrolledOpen(open);
      onOpenChange?.(open);
      if (!open) onClose?.();
    },
    [isOpenProp, onClose, onOpenChange],
  );
  const childList = React.Children.toArray(children);
  const isTriggerControlled = childList.some(isSheetTriggerElement);
  const contextValue = useMemo(
    () => ({
      closeSheet: () => setIsOpen(false),
      isDetached,
      isDismissable,
      isNested,
      isOpen,
      isTriggerControlled,
      onAnimationEnd,
      placement,
      setIsOpen,
      snapPoints,
    }),
    [
      isDetached,
      isDismissable,
      isNested,
      isOpen,
      isTriggerControlled,
      onAnimationEnd,
      placement,
      setIsOpen,
      snapPoints,
    ],
  );
  const content = <SheetContext.Provider value={contextValue}>{children}</SheetContext.Provider>;

  if (!isTriggerControlled) return content;

  return (
    <AriaSheetTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      {content}
    </AriaSheetTrigger>
  );
}

function isSheetTriggerElement(child: ReactNode): child is ReactElement {
  return isValidElement(child) && child.type === SheetTrigger;
}

/** Drop the old full-height sentinel. React Aria treats the last reveal as implicit. */
function normalizeSnapPoints(snapPoints?: Array<number | string>) {
  if (!snapPoints?.length) return undefined;

  const points = snapPoints.filter((point, index) => {
    const isLast = index === snapPoints.length - 1;

    if (!isLast) return true;

    return point !== 1 && point !== "1" && point !== "100%";
  });

  return points.length > 0 ? points : undefined;
}

/* -------------------------------------------------------------------------------------------------
 * Sheet Trigger
 * -----------------------------------------------------------------------------------------------*/

interface SheetTriggerProps {
  children: ReactElement<{onPress?: ComponentPropsWithRef<typeof CloseButton>["onPress"]}>;
}

function SheetTrigger({children}: SheetTriggerProps) {
  return children;
}

/* -------------------------------------------------------------------------------------------------
 * Sheet Close
 * -----------------------------------------------------------------------------------------------*/

interface SheetCloseProps {
  children: ReactElement<{onPress?: ComponentPropsWithRef<typeof CloseButton>["onPress"]}>;
}

function SheetClose({children}: SheetCloseProps) {
  const {closeSheet} = useSheetContext();

  return React.cloneElement(children, {
    ...mergeProps(children.props, {onPress: closeSheet}),
  });
}

/* -------------------------------------------------------------------------------------------------
 * Sheet Backdrop
 * -----------------------------------------------------------------------------------------------*/

interface SheetBackdropProps extends Omit<
  ComponentPropsWithRef<typeof AriaSheetOverlay>,
  | "children"
  | "className"
  | "defaultOpen"
  | "isOpen"
  | "onOpenChange"
  | "position"
  | "preventDismissal"
  | "snapPoints"
  | "style"
> {
  children?: ReactNode;
  className?: string;
  /**
   * Keep the backdrop mounted while the sheet is closed. Modal behavior still
   * ends with `isOpen`; use it to retain content through an exit or while hidden.
   */
  isExiting?: boolean;
  variant?: SheetVariants["backdrop"];
}

const SheetBackdrop = ({
  children,
  className,
  isExiting,
  ref,
  variant = "opaque",
  ...rest
}: SheetBackdropProps) => {
  const {isDismissable, isOpen, isTriggerControlled, placement, setIsOpen, snapPoints} =
    useSheetContext();
  const slots = useMemo(() => sheetVariants({backdrop: variant, placement}), [placement, variant]);
  const [hasOpened, setHasOpened] = useState(isOpen);
  const [hasExited, setHasExited] = useState(false);

  if (isOpen && hasExited) setHasExited(false);

  const onExitComplete = useCallback(() => setHasExited(true), []);

  if (isOpen && !hasOpened) setHasOpened(true);

  // RAC forwards this compatibility prop to ModalOverlay at runtime.
  const retentionProps = {isExiting: hasOpened && isExiting};
  const overlayRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMemo(() => mergeRefs(overlayRef, ref), [ref]);
  const fadeRange = snapPoints?.length ? {start: snapPoints.length - 1} : undefined;

  // Releasing retained content must unmount it, rather than reveal a suspended
  // RAC overlay that may still be waiting for its native exit observer.
  if (!isOpen && hasExited && !isExiting) return null;

  return (
    <Suspense fallback={null}>
      <SheetVisibility isHidden={!!(!isOpen && hasExited && isExiting)}>
        <AriaSheetOverlay
          {...rest}
          {...retentionProps}
          {...(isTriggerControlled ? {} : {isOpen, onOpenChange: setIsOpen})}
          ref={mergedRef}
          aria-hidden={!isOpen || undefined}
          className={composeTwRenderProps(className, slots.overlay())}
          data-closed={!isOpen ? "" : undefined}
          data-slot="sheet-overlay"
          inert={!isOpen}
          position={placement}
          preventDismissal={!isDismissable}
          snapPoints={snapPoints}
        >
          {(renderProps) => (
            <>
              <SheetLifecycle
                {...renderProps}
                overlayRef={overlayRef}
                onExitComplete={onExitComplete}
              />
              <AriaSheetBackdrop
                className={slots.backdrop()}
                data-slot="sheet-backdrop"
                swipeAnimation={BACKDROP_ANIMATION}
                swipeAnimationRange={fadeRange}
              />
              {children}
            </>
          )}
        </AriaSheetOverlay>
      </SheetVisibility>
    </Suspense>
  );
};

// Suspense preserves the mounted DOM/state but detaches layout refs while hidden.
// RAC registers its stack entry through the overlay ref, so suspending only after
// exit releases that entry without requiring React 19.2's Activity component.
function SheetVisibility({children, isHidden}: {children: ReactNode; isHidden: boolean}) {
  const [hidden] = useState(() => new Promise<void>(() => {}));

  if (isHidden) throw hidden;

  return children;
}

/* -------------------------------------------------------------------------------------------------
 * Sheet Content
 * -----------------------------------------------------------------------------------------------*/

interface SheetContentProps extends Omit<
  ComponentPropsWithRef<typeof AriaSheet>,
  "children" | "className"
> {
  children?: ReactNode | ((props: SheetRenderProps) => ReactNode);
  className?: string;
}

const SheetContent = ({children, className, ref, ...rest}: SheetContentProps) => {
  const {isDetached, placement, snapPoints} = useSheetContext();
  const slots = useMemo(() => sheetVariants({placement}), [placement]);

  return (
    <AriaSheet
      {...rest}
      ref={ref}
      className={composeTwRenderProps(className, slots.content())}
      data-detached={isDetached ? "" : undefined}
      data-placement={placement}
      data-slot="sheet-content"
      data-snap-points={snapPoints?.length ? "" : undefined}
      overscrollPadding={!isDetached}
      stackAnimation={STACK_ANIMATION}
    >
      {children}
    </AriaSheet>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sheet Dialog
 * -----------------------------------------------------------------------------------------------*/

interface SheetDialogProps extends Omit<
  ComponentPropsWithRef<typeof AriaSheetContent>,
  "children"
> {
  children?: ReactNode;
}

const SheetDialog = ({children, className, ...props}: SheetDialogProps) => {
  const {placement} = useSheetContext();
  const slots = useMemo(() => sheetVariants({placement}), [placement]);

  return (
    <SurfaceContext value={{variant: "default"}}>
      <AriaSheetContent
        {...props}
        className={composeSlotClassName(slots?.dialog, className)}
        data-placement={placement}
        data-slot="sheet-dialog"
      >
        {children}
      </AriaSheetContent>
    </SurfaceContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sheet Header
 * -----------------------------------------------------------------------------------------------*/

interface SheetHeaderProps extends ComponentPropsWithRef<"div"> {}

const SheetHeader = ({children, className, ...props}: SheetHeaderProps) => {
  const {placement} = useSheetContext();
  const slots = useMemo(() => sheetVariants({placement}), [placement]);

  return (
    <div
      className={composeSlotClassName(slots?.header, className)}
      data-slot="sheet-header"
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sheet Heading
 * -----------------------------------------------------------------------------------------------*/

interface SheetHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const SheetHeading = ({children, className, ...props}: SheetHeadingProps) => {
  const {placement} = useSheetContext();
  const slots = useMemo(() => sheetVariants({placement}), [placement]);

  return (
    <HeadingPrimitive
      {...props}
      className={composeSlotClassName(slots?.heading, className)}
      data-slot="sheet-heading"
      slot={props.slot ?? "title"}
    >
      {children}
    </HeadingPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sheet Body
 * -----------------------------------------------------------------------------------------------*/

interface SheetBodyProps extends ComponentPropsWithRef<"div"> {}

const SheetBody = ({children, className, ...props}: SheetBodyProps) => {
  const {placement} = useSheetContext();
  const slots = useMemo(() => sheetVariants({placement}), [placement]);

  return (
    <div className={composeSlotClassName(slots?.body, className)} data-slot="sheet-body" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sheet Footer
 * -----------------------------------------------------------------------------------------------*/

interface SheetFooterProps extends ComponentPropsWithRef<"div"> {}

const SheetFooter = ({children, className, ...props}: SheetFooterProps) => {
  const {placement} = useSheetContext();
  const slots = useMemo(() => sheetVariants({placement}), [placement]);

  return (
    <div
      className={composeSlotClassName(slots?.footer, className)}
      data-slot="sheet-footer"
      {...props}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sheet Handle
 * -----------------------------------------------------------------------------------------------*/

interface SheetHandleProps extends ComponentPropsWithRef<"div"> {}

const SheetHandle = ({
  children,
  className,
  onLostPointerCapture,
  onPointerCancel,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  ...rest
}: SheetHandleProps) => {
  const {placement} = useSheetContext();
  const slots = useMemo(() => sheetVariants({placement}), [placement]);
  const drag = useSheetHandleDrag(placement);

  return (
    <div
      aria-hidden="true"
      className={composeSlotClassName(slots?.handle, className)}
      data-sheet-handle=""
      data-slot="sheet-handle"
      {...rest}
      onLostPointerCapture={(event) => {
        onLostPointerCapture?.(event);
        drag.onLostPointerCapture(event);
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        drag.onPointerCancel(event);
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (!event.defaultPrevented) drag.onPointerDown(event);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        drag.onPointerMove(event);
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        drag.onPointerUp(event);
      }}
    >
      {children ?? <span className={slots.handleBar()} data-slot="sheet-handle-bar" />}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sheet CloseTrigger
 * -----------------------------------------------------------------------------------------------*/

interface SheetCloseTriggerProps extends Omit<
  ComponentPropsWithRef<typeof CloseButton>,
  "className"
> {
  className?: string;
}

const SheetCloseTrigger = ({children, className, onPress, ...props}: SheetCloseTriggerProps) => {
  const {closeSheet, placement} = useSheetContext();
  const slots = useMemo(() => sheetVariants({placement}), [placement]);

  return (
    <CloseButton
      {...props}
      className={composeSlotClassName(slots?.closeTrigger, className)}
      data-slot="sheet-close-trigger"
      onPress={mergeProps({onPress}, {onPress: closeSheet}).onPress}
    >
      {children}
    </CloseButton>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sheet NestedRoot
 * -----------------------------------------------------------------------------------------------*/

export function SheetNestedRoot(props: SheetRootProps) {
  const parent = React.useContext(SheetContext);

  if (!parent) {
    throw new Error("Sheet.NestedRoot must be placed in another Sheet");
  }

  return <SheetRoot {...props} isNested />;
}

export {
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
};

SheetRoot.displayName = "HeroUI.Sheet";
SheetTrigger.displayName = "HeroUI.Sheet.Trigger";
SheetClose.displayName = "HeroUI.Sheet.Close";
SheetBackdrop.displayName = "HeroUI.Sheet.Backdrop";
SheetContent.displayName = "HeroUI.Sheet.Content";
SheetDialog.displayName = "HeroUI.Sheet.Dialog";
SheetHeader.displayName = "HeroUI.Sheet.Header";
SheetHeading.displayName = "HeroUI.Sheet.Heading";
SheetBody.displayName = "HeroUI.Sheet.Body";
SheetFooter.displayName = "HeroUI.Sheet.Footer";
SheetHandle.displayName = "HeroUI.Sheet.Handle";
SheetCloseTrigger.displayName = "HeroUI.Sheet.CloseTrigger";
SheetNestedRoot.displayName = "HeroUI.Sheet.NestedRoot";
