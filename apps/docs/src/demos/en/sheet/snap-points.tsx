"use client";

import {Button, Sheet} from "@heroui/react";

const snapPointValues = ["148px", "355px"];

export function SnapPoints() {
  return (
    <Sheet snapPoints={snapPointValues}>
      <Sheet.Trigger>
        <Button variant="secondary">Snap Points</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Snap Points</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted">
                  This sheet opens at 148px and snaps again at 355px. Dragging past the last detent
                  reveals the full sheet, and the backdrop fades in after that point.
                </p>
                {Array.from({length: 6}).map((_, i) => (
                  <p key={i} className="text-sm text-muted">
                    {i === 0
                      ? "Swipe up to reveal more content and fade the backdrop in."
                      : `More content at this level (${i + 1}).`}
                  </p>
                ))}
              </div>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
