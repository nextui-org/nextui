import type {MoveMoveEvent, MoveResult} from "@react-aria/interactions";

import {useEffect, useRef} from "react";
import {useMove} from "@react-aria/interactions";

export interface UseDraggableProps {
  /**
   * Ref to the moving target DOM node.
   */
  targetRef?: React.RefObject<HTMLElement>;
  /**
   * Ref to the drag DOM node.
   */
  dragRef?: React.RefObject<HTMLElement>;
  /**
   * Whether the target is draggable.
   * @default true
   */
  draggable?: boolean;
  /**
   * Whether the target can overflow the viewport.
   * @default false
   */
  overflow?: boolean;
}

export function useDraggable(props: UseDraggableProps): MoveResult {
  const {targetRef, dragRef, draggable = true, overflow = false} = props;
  const boundary = useRef({minLeft: 0, minTop: 0, maxLeft: 0, maxTop: 0});
  let transform = {offsetX: 0, offsetY: 0};

  const onMoveStart = () => {
    const {offsetX, offsetY} = transform;

    const targetRect = targetRef?.current?.getBoundingClientRect();
    const targetLeft = targetRect?.left ?? 0;
    const targetTop = targetRect?.top ?? 0;
    const targetWidth = targetRect?.width ?? 0;
    const targetHeight = targetRect?.height ?? 0;

    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    const minLeft = -targetLeft + offsetX;
    const minTop = -targetTop + offsetY;
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
    const maxTop = clientHeight - targetTop - targetHeight + offsetY;

    boundary.current = {
      minLeft,
      minTop,
      maxLeft,
      maxTop,
    };
  };

  const onMove = (e: MoveMoveEvent) => {
    if (!draggable) {
      return;
    }
    const {offsetX, offsetY} = transform;
    const {minLeft, minTop, maxLeft, maxTop} = boundary.current;
    let moveX = offsetX + e.deltaX;
    let moveY = offsetY + e.deltaY;

    if (!overflow) {
      moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
      moveY = Math.min(Math.max(moveY, minTop), maxTop);
    }

    transform = {
      offsetX: moveX,
      offsetY: moveY,
    };

    if (targetRef?.current) {
      targetRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  };

  const {moveProps} = useMove({
    onMoveStart,
    onMove,
  });

  useEffect(() => {
    if (draggable && dragRef?.current) {
      dragRef.current.style.cursor = "move";
      dragRef.current.style.userSelect = "none";
    }
  }, [draggable, onMoveStart, onMove]);

  return {
    moveProps,
  };
}
