"use client";

import {Button, Sheet} from "@heroui/react";

export function Detached() {
  const placements = ["bottom", "top", "left", "right"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((p) => (
        <Sheet key={p} isDetached placement={p}>
          <Sheet.Trigger>
            <Button variant="secondary">{p.charAt(0).toUpperCase() + p.slice(1)}</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop>
            <Sheet.Content
              className={p === "left" || p === "right" ? "w-[310px]" : "mx-auto max-w-[420px]"}
            >
              <Sheet.Dialog className={p === "left" || p === "right" ? "h-full" : undefined}>
                {p === "bottom" && <Sheet.Handle />}
                <Sheet.Body className="flex flex-col gap-4 py-5">
                  <Sheet.Heading>Detached {p}</Sheet.Heading>
                  <p className="text-sm text-muted">
                    The sheet floats away from the viewport edge with rounded corners on all sides.
                  </p>
                </Sheet.Body>
                {p === "top" && <Sheet.Handle />}
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}
