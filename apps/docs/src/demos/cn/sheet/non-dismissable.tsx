"use client";

import {Button, Sheet} from "@heroui/react";

export function NonDismissable() {
  return (
    <Sheet isDismissable={false}>
      <Sheet.Trigger>
        <Button variant="secondary">重要操作</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Header>
              <Sheet.Heading>确认操作</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                此面板无法通过点击外部或拖动关闭，请使用下方的按钮。
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
