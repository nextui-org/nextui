"use client";

import {Button, Sheet} from "@heroui/react";

const snapPointValues = ["148px", "355px"];

export function SnapPointsSequential() {
  return (
    <Sheet snapPoints={snapPointValues}>
      <Sheet.Trigger>
        <Button variant="secondary">Sequential Snap Points</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Snap points</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                A swipe can move across several detents. Full height is the end of the gesture, so
                it is not listed as its own snap point.
              </p>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
