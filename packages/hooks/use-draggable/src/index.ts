import {useEffect} from "react";

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
   */
  overflow?: boolean;
}

export function useDraggable(props: UseDraggableProps) {
  const {targetRef, dragRef, draggable = true, overflow = false} = props;
  let transform = {
    offsetX: 0,
    offsetY: 0,
  };

  const onMousedown = (e: MouseEvent) => {
    const downX = e.clientX;
    const downY = e.clientY;
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

    const onMousemove = (e: MouseEvent) => {
      let moveX = offsetX + e.clientX - downX;
      let moveY = offsetY + e.clientY - downY;

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

    const onMouseup = () => {
      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("mouseup", onMouseup);
    };

    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("mouseup", onMouseup);
  };

  const onDraggable = () => {
    if (dragRef?.current && targetRef?.current) {
      dragRef.current.addEventListener("mousedown", onMousedown);
      dragRef.current.style.cursor = "move";
    }
  };

  const offDraggable = () => {
    if (dragRef?.current && targetRef?.current) {
      dragRef.current.removeEventListener("mousedown", onMousedown);
    }
  };

  useEffect(() => {
    if (draggable) {
      onDraggable();
    } else {
      offDraggable();
    }

    return () => {
      offDraggable();
    };
  }, [draggable, onDraggable, offDraggable]);
}
