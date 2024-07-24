import type {MoveMoveEvent, MoveResult} from "@react-aria/interactions";

import {useEffect, useRef, useCallback} from "react";
import {useMove} from "@react-aria/interactions";

export interface UseDraggableProps {
  /**
   * Ref to the moving target DOM node.
   */
  targetRef?: React.RefObject<HTMLElement>;
  /**
   * Whether to disable the target is draggable.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the target can overflow the viewport.
   * @default false
   */
  canOverflow?: boolean;
}

/**
 * A hook to make a target draggable.
 * @param props UseDraggableProps
 * @returns MoveResult for the drag DOM node.
 */
export function useDraggable(props: UseDraggableProps): MoveResult {
  const {targetRef, isDisabled = false, canOverflow = false} = props;
  const boundary = useRef({minLeft: 0, minTop: 0, maxLeft: 0, maxTop: 0});
  let transform = {offsetX: 0, offsetY: 0};

  const onMoveStart = useCallback(() => {
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
  }, [transform, targetRef?.current]);

  const onMove = useCallback(
    (e: MoveMoveEvent) => {
      if (isDisabled) {
        return;
      }
      const {offsetX, offsetY} = transform;
      const {minLeft, minTop, maxLeft, maxTop} = boundary.current;
      let moveX = offsetX + e.deltaX;
      let moveY = offsetY + e.deltaY;

      if (!canOverflow) {
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
    },
    [isDisabled, transform, boundary.current, canOverflow, targetRef?.current],
  );

  const {moveProps} = useMove({
    onMoveStart,
    onMove,
  });

  const preventDefault = useCallback((e: TouchEvent) => {
    e.preventDefault();
  }, []);

  // NOTE: This process is due to the modal being displayed at the bottom instead of the center when opened on mobile sizes.
  // It will become unnecessary once the modal is centered properly.
  useEffect(() => {
    if (!isDisabled) {
      // Prevent body scroll when dragging at mobile.
      document.body.addEventListener("touchmove", preventDefault, {passive: false});
    }

    return () => {
      document.body.removeEventListener("touchmove", preventDefault);
    };
  }, [isDisabled]);

  return {
    moveProps: {
      ...moveProps,
      style: {cursor: !isDisabled ? "move" : undefined},
    },
  };
}
