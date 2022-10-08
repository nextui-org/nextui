import {PressEvent} from "@react-types/shared";
import {MouseEvent, RefObject, useState} from "react";

export function useDrip(initialValue = false, ref: RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(initialValue);
  const [dripX, setDripX] = useState(0);
  const [dripY, setDripY] = useState(0);

  const onCompleted = () => {
    setIsVisible(false);
    setDripX(0);
    setDripY(0);
  };

  const onClick = (event: MouseEvent<HTMLElement> | PressEvent | Event) => {
    if (!ref?.current) return;
    const rect = ref.current.getBoundingClientRect?.();

    if (!rect) return;

    setIsVisible(true);
    if (typeof event === "object" && "clientX" in event) {
      setDripX(event.clientX - rect.left);
      setDripY(event.clientY - rect.top);
    }
  };

  return {
    isVisible,
    x: dripX,
    y: dripY,
    onClick,
    onCompleted,
  };
}

export type UseDripReturn = ReturnType<typeof useDrip>;
