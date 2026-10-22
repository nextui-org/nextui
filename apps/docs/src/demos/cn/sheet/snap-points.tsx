"use client";

import {Button, Sheet} from "@heroui/react";

const snapPointValues = ["148px", "355px"];

export function SnapPoints() {
  return (
    <Sheet snapPoints={snapPointValues}>
      <Sheet.Trigger>
        <Button variant="secondary">吸附点</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>吸附点</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted">
                  此面板初始显示 148px，并可吸附至
                  355px。拖过最后一个吸附点后，面板将完全展开，背景也会逐渐淡入。
                </p>
                {Array.from({length: 6}).map((_, i) => (
                  <p key={i} className="text-sm text-muted">
                    {i === 0
                      ? "向上滑动以显示更多内容，并使背景逐渐淡入。"
                      : `此位置的更多内容（${i + 1}）。`}
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
