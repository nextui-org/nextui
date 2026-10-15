import type {Theme} from "../../hooks/use-theme-toggle";

import {Chip} from "@heroui/react";
import React, {forwardRef, useEffect} from "react";

import {ComponentShowcase} from "./component-showcase";

interface PreviewColumnProps {
  theme: Theme;
  className?: string;
}

export const PreviewColumn = forwardRef<HTMLDivElement, PreviewColumnProps>(function PreviewColumn(
  {className = "", theme},
  ref,
) {
  useEffect(() => {
    const element = ref && "current" in ref ? ref.current : null;

    if (element) {
      // Remove existing theme classes
      element.classList.remove("light", "dark");
      // Apply theme class and attribute
      element.classList.add(theme);
      element.setAttribute("data-theme", theme);
    }
  }, [theme, ref]);

  return (
    <div
      ref={ref}
      className={`@container/preview flex min-w-0 flex-1 flex-col rounded-2xl border border-border bg-background text-foreground ${theme} ${className}`}
      data-theme={theme}
    >
      {/* Header */}
      <div className="shrink-0 p-2 pb-0">
        <Chip className="capitalize" variant="soft">
          <svg
            fill="none"
            height="12"
            viewBox="0 0 12 12"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_17699_1194)">
              <rect fill="currentColor" height="2.25" rx="1.125" width="2.25" x="4.875" y="4.875" />
              <path
                d="M8.48033 1.47949L9.99807 2.41887C10.5824 2.78056 10.9402 3.41695 10.9454 4.10418L10.96 6L10.9454 7.89582C10.9402 8.58305 10.5824 9.21944 9.99807 9.58113L8.48033 10.5205L7.02456 11.3889C6.3934 11.7653 5.6066 11.7653 4.97544 11.3889L3.51967 10.5205L2.00193 9.58113C1.41755 9.21944 1.05981 8.58305 1.05455 7.89582L1.04004 6L1.05455 4.10418C1.05981 3.41695 1.41755 2.78056 2.00193 2.41887L3.51967 1.47949L4.97545 0.611137C5.6066 0.234657 6.3934 0.234657 7.02456 0.611138L8.48033 1.47949ZM4.06181 2.44922L3.06635 3.06477C2.4814 3.42648 2.12333 4.06337 2.11826 4.7511L2.109 6.00879L2.1182 7.24858C2.1233 7.93609 2.48118 8.57278 3.06585 8.93452L4.05833 9.54858L4.97541 10.0955C5.60659 10.4719 6.39337 10.4719 7.02449 10.0953L7.94098 9.54858L8.93379 8.93432C9.51827 8.57269 9.87612 7.93626 9.88143 7.24897L9.891 6.00879L9.88136 4.7505C9.8761 4.0631 9.51817 3.42657 8.93356 3.06493L7.93849 2.4494C7.9383 2.44928 7.93807 2.44922 7.93784 2.44922C7.93761 2.44922 7.93739 2.44916 7.9372 2.44904L7.02489 1.90448C6.39357 1.52765 5.60639 1.52759 4.97501 1.90432L4.06181 2.44922Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_17699_1194">
                <rect fill="white" height="12" width="12" />
              </clipPath>
            </defs>
          </svg>
          <Chip.Label>{theme}</Chip.Label>
        </Chip>
      </div>
      {/* Preview Content */}
      <div className="min-w-0 flex-1">
        <ComponentShowcase />
      </div>
    </div>
  );
});
