"use client";

import {Button, Sheet} from "@heroui/react";

export function HandleOnly() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">拖动手柄</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger aria-label="关闭面板" />
            <Sheet.Header>
              <Sheet.Heading>滑动面板</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                手柄提供可拖动的视觉提示。面板完全展开前，可以在面板任意位置滑动；完全展开后，滑动会滚动内容，而不再移动面板。
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">完成</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
