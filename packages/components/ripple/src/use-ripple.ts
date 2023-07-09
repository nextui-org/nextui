import {useCallback, useEffect, useState} from "react";

export type RippleType = {
  key: number;
  x: number;
  y: number;
  size: number;
};

export interface UseRippleProps {
  /**
  /**
   * The time to remove the ripples in ms.
   * @default 1000
   */
  removeAfter?: number;
}

export function useRipple(props: UseRippleProps = {}) {
  const {removeAfter = 1000, ...otherProps} = props;

  const [ripples, setRipples] = useState<RippleType[]>([]);

  useEffect(() => {
    const timeoutIds = ripples.map(
      (_, i) =>
        setTimeout(() => {
          setRipples((prevState) => prevState.filter((_, index) => index !== i));
        }, removeAfter), // remove after 1s
    );

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [ripples]);

  const onClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const trigger = event.currentTarget;

    const size = Math.max(trigger.clientWidth, trigger.clientHeight);
    const rect = trigger.getBoundingClientRect();

    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: new Date().getTime(),
        size,
        x: event.clientX - rect.x - size / 2,
        y: event.clientY - rect.y - size / 2,
      },
    ]);
  }, []);

  return {ripples, onClick, ...otherProps};
}

export type UseRippleReturn = ReturnType<typeof useRipple>;
