/**
 * FreeSoloPopover
 *
 * This is a popover that is not tied to a trigger. It is used for the free solo
 * select component.
 *
 * @internal
 */

import * as React from "react";
import {DismissButton, Overlay} from "@react-aria/overlays";
import {forwardRef} from "@nextui-org/system";
import {domAnimation, HTMLMotionProps, LazyMotion, m} from "framer-motion";
import {mergeProps} from "@react-aria/utils";
import {getTransformOrigins} from "@nextui-org/aria-utils";
import {TRANSITION_VARIANTS} from "@nextui-org/framer-utils";

import {usePopover, UsePopoverProps, UsePopoverReturn} from "./use-popover";

export interface FreeSoloPopoverProps extends Omit<UsePopoverProps, "children"> {
  children: React.ReactNode | ((titleProps: React.DOMAttributes<HTMLElement>) => React.ReactNode);
  transformOrigin?: {
    originX?: number;
    originY?: number;
  };
}

type FreeSoloPopoverWrapperProps = {
  children: React.ReactNode;
  disableAnimation: boolean;
  transformOrigin?: FreeSoloPopoverProps["transformOrigin"];
  placement: UsePopoverReturn["placement"];
  motionProps?: UsePopoverProps["motionProps"];
} & React.HTMLAttributes<HTMLDivElement>;

const FreeSoloPopoverWrapper = forwardRef<"div", FreeSoloPopoverWrapperProps>(
  (
    {
      children,
      motionProps,
      placement,
      disableAnimation,
      style: styleProp = {},
      transformOrigin = {},
      ...otherProps
    },
    ref,
  ) => {
    let style = styleProp;

    if (transformOrigin.originX !== undefined || transformOrigin.originY !== undefined) {
      style = {
        ...style,
        // @ts-ignore
        transformOrigin,
      };
    } else {
      style = {
        ...style,
        ...getTransformOrigins(placement === "center" ? "top" : placement),
      };
    }

    return disableAnimation ? (
      <div {...otherProps} ref={ref}>
        {children}
      </div>
    ) : (
      <LazyMotion features={domAnimation}>
        <m.div
          ref={ref}
          animate="enter"
          exit="exit"
          initial="initial"
          style={style}
          variants={TRANSITION_VARIANTS.scaleSpringOpacity}
          {...mergeProps(otherProps, motionProps)}
        >
          {children}
        </m.div>
      </LazyMotion>
    );
  },
);

FreeSoloPopoverWrapper.displayName = "NextUI.FreeSoloPopoverWrapper";

const FreeSoloPopover = forwardRef<"div", FreeSoloPopoverProps>(
  ({children, transformOrigin, ...props}, ref) => {
    const {
      Component,
      state,
      placement,
      backdrop,
      titleProps,
      portalContainer,
      disableAnimation,
      motionProps,
      isNonModal,
      getPopoverProps,
      getBackdropProps,
      getDialogProps,
      getContentProps,
    } = usePopover({
      ...props,
      ref,
    });

    const backdropContent = React.useMemo(() => {
      if (backdrop === "transparent") {
        return null;
      }

      if (disableAnimation) {
        return <div {...getBackdropProps()} />;
      }

      return (
        <LazyMotion features={domAnimation}>
          <m.div
            animate="enter"
            exit="exit"
            initial="exit"
            variants={TRANSITION_VARIANTS.fade}
            {...(getBackdropProps() as HTMLMotionProps<"div">)}
          />
        </LazyMotion>
      );
    }, [backdrop, disableAnimation, getBackdropProps]);

    return (
      <Overlay portalContainer={portalContainer}>
        {!isNonModal && backdropContent}
        <Component {...getPopoverProps()}>
          <FreeSoloPopoverWrapper
            disableAnimation={disableAnimation}
            motionProps={motionProps}
            placement={placement}
            tabIndex={-1}
            transformOrigin={transformOrigin}
            {...getDialogProps()}
          >
            {!isNonModal && <DismissButton onDismiss={state.close} />}
            <div {...getContentProps()}>
              {typeof children === "function" ? children(titleProps) : children}
            </div>
            <DismissButton onDismiss={state.close} />
          </FreeSoloPopoverWrapper>
        </Component>
      </Overlay>
    );
  },
);

FreeSoloPopover.displayName = "NextUI.FreeSoloPopover";

export default FreeSoloPopover;
