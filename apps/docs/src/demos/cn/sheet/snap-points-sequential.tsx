"use client";

import {Button, Sheet} from "@heroui/react";

const snapPointValues = ["148px", "355px"];

export function SnapPointsSequential() {
  return (
    <Sheet snapPoints={snapPointValues}>
      <Sheet.Trigger>
        <Button variant="secondary">连续吸附点</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>吸附点</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                一次滑动可以跨越多个吸附点。完全展开是手势的最终位置，因此无需将其单独列为吸附点。
              </p>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
