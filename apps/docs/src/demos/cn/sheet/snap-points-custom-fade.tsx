"use client";

import {Button, Sheet} from "@heroui/react";

const fadeSnapPoints = ["150px", "300px", "450px"];

export function SnapPointsCustomFade() {
  return (
    <Sheet snapPoints={fadeSnapPoints}>
      <Sheet.Trigger>
        <Button variant="secondary">背景渐变</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>背景渐变</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                经过各个吸附点时，背景保持透明。越过最后一个吸附点并继续完全展开面板时，背景才逐渐显现。
              </p>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
