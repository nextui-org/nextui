import React, {MutableRefObject, useEffect, useMemo, useRef, useState} from "react";
import {createPortal} from "react-dom";

import usePortal from "../use-portal";
import useResize from "../use-resize";
import CSSTransition from "../utils/css-transition";
import useClickAnyWhere from "../use-click-anywhere";
import {CSS} from "../theme/stitches.config";
import {Placement} from "../utils/prop-types";
import clsx from "../utils/clsx";
import withDefaults from "../utils/with-defaults";

import {
  StyledTooltipContent,
  StyledTooltip,
  StyledTooltipArrow,
  TooltipContentVariantsProps,
} from "./tooltip.styles";
import {
  getRect,
  getPlacement,
  TooltipPlacement,
  defaultTooltipPlacement,
  getIconPlacement,
} from "./placement";

interface Props {
  placement?: Placement;
  visible?: boolean;
  offset?: number;
  parent?: MutableRefObject<HTMLElement | null> | undefined;
  animated?: boolean;
  rounded?: boolean;
  hideArrow?: boolean;
  className?: string;
  css?: CSS;
}

const defaultProps = {
  placement: "top" as Placement,
  offset: 12,
  className: "",
};

export type TooltipContentProps = Props & typeof defaultProps & TooltipContentVariantsProps;

const preClass = "nextui-tooltip";

const TooltipContent: React.FC<React.PropsWithChildren<TooltipContentProps>> = ({
  children,
  parent,
  visible,
  offset,
  placement,
  rounded: _rounded,
  animated,
  className,
  hideArrow,
  css,
  ...props
}) => {
  const el = usePortal("tooltip");
  const selfRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<TooltipPlacement>(defaultTooltipPlacement);

  if (!parent) return null;

  const updateRect = () => {
    const pos = getPlacement(placement, getRect(parent), offset);

    setRect(pos);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {transform, top, left, right, bottom} = useMemo(
    () => getIconPlacement(placement, 5),
    [placement],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useResize(updateRect);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useClickAnyWhere(() => updateRect());
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    updateRect();
  }, [visible]);

  const preventHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getState = useMemo(() => {
    return visible ? "open" : "closed";
  }, [visible]);

  if (!el) return null;

  return createPortal(
    <CSSTransition enterTime={20} leaveTime={20} name={`${preClass}-wrapper`} visible={visible}>
      <StyledTooltipContent
        ref={selfRef}
        animated={animated}
        className={clsx(`${preClass}-content`, `${preClass}--${getState}`, className)}
        css={{
          left: rect.left,
          top: `calc(${rect.top} + 6px)`,
          transform: rect.transform,
          [`&.${preClass}-wrapper-enter-active`]: {
            opacity: 1,
            top: rect.top,
          },
          ...(css as any),
        }}
        data-state={getState}
        onClick={preventHandler}
        {...props}
      >
        <StyledTooltip
          className={clsx(preClass, {
            [`${preClass}--with-arrow`]: !hideArrow,
          })}
          data-state={getState}
          hideArrow={hideArrow}
          role="tooltip"
        >
          <StyledTooltipArrow
            className={`${preClass}-arrow`}
            css={{
              left,
              top,
              right,
              bottom,
              transform,
            }}
          />
          {children}
        </StyledTooltip>
      </StyledTooltipContent>
    </CSSTransition>,
    el,
  );
};

TooltipContent.toString = () => ".nextui-tooltip-content";

export default withDefaults(TooltipContent, defaultProps);
