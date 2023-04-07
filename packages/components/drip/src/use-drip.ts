import {MouseEvent, CSSProperties, useState} from "react";
import {getUniqueID} from "@nextui-org/shared-utils";

export type DripInstance = {
  key: number | string;
  style: CSSProperties;
};

export function useDrip() {
  const [drips, setDrips] = useState<DripInstance[]>([]);

  const onClick = (event: MouseEvent<HTMLElement>) => {
    const trigger = event.currentTarget;

    const size = Math.max(trigger.clientWidth, trigger.clientHeight);
    const rect = trigger.getBoundingClientRect();
    const x = event.clientX - rect.x - size / 2;
    const y = event.clientY - rect.y - size / 2;

    const dripStyle: CSSProperties = {
      width: `${size}px`,
      height: `${size}px`,
      top: `${y}px`,
      left: `${x}px`,
    };

    setDrips((prev) => [
      ...prev,
      {
        key: getUniqueID("drip"),
        style: dripStyle,
      },
    ]);

    setTimeout(() => {
      setDrips((prev) => prev.slice(1));
    }, 400);
  };

  return {
    drips,
    onClick,
  };
}

export type UseDripReturn = ReturnType<typeof useDrip>;
