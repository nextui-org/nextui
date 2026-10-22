"use client";

import {Button, Sheet} from "@heroui/react";

export function Placements() {
  const placements = ["bottom", "top", "left", "right"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((p) => (
        <Sheet key={p} placement={p}>
          <Sheet.Trigger>
            <Button variant="secondary">{p.charAt(0).toUpperCase() + p.slice(1)}</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant="blur">
            <Sheet.Content className={p === "left" || p === "right" ? "w-[400px]" : undefined}>
              <Sheet.Dialog>
                <Sheet.CloseTrigger />
                {p === "bottom" && <Sheet.Handle />}
                <Sheet.Header>
                  <Sheet.Heading>{p.charAt(0).toUpperCase() + p.slice(1)} Sheet</Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <p className="text-sm text-muted">
                    This sheet slides in from the <strong>{p}</strong> edge of the screen with a
                    smooth spring-like animation.
                  </p>
                </Sheet.Body>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button variant="secondary">Cancel</Button>
                  </Sheet.Close>
                  <Sheet.Close>
                    <Button variant="secondary">Done</Button>
                  </Sheet.Close>
                </Sheet.Footer>
                {p === "top" && <Sheet.Handle />}
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}
