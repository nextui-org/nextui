"use client";

import {Button, Sheet} from "@heroui/react";

export function Basic() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">打开面板</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger aria-label="关闭面板" />
            <Sheet.Header>
              <Sheet.Heading>面板标题</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                这是一个具有流畅拖动关闭动画的底部面板。向下拖动手柄或点击关闭按钮即可关闭。
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">取消</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button variant="secondary">确认</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
