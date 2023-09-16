import {useCallback, useState} from "react";

export type RippleType = {
  key: number;
  x: number;
  y: number;
  size: number;
};

export interface UseRippleProps {}

export function useRipple(props: UseRippleProps = {}) {
  const [ripples, setRipples] = useState<RippleType[]>([]);

  const onClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const trigger = event.currentTarget;

    const size = Math.max(trigger.clientWidth, trigger.clientHeight);
    const rect = trigger.getBoundingClientRect();

    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: Date.now(),
        size,
        x: event.clientX - rect.x - size / 2,
        y: event.clientY - rect.y - size / 2,
      },
    ]);
  }, []);

  const onClear = useCallback((key: number) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key));
  }, []);

  return {ripples, onClick, onClear, ...props};
}

export type UseRippleReturn = ReturnType<typeof useRipple>;
