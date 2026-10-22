"use client";

import {Button, Sheet} from "@heroui/react";

export function ScrollableContent() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">条款与条件</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger aria-label="关闭面板" />
            <Sheet.Header>
              <Sheet.Heading>条款与条件</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              {Array.from({length: 20}).map((_, i) => (
                <p key={i} className="mb-3 text-sm text-muted">
                  第 {i + 1}{" "}
                  段：使用本服务前，请仔细阅读相关条款与条件。继续使用即表示您已了解并同意这些条款。我们会持续改进服务，如有变更，将及时通知您。
                </p>
              ))}
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">拒绝</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button variant="secondary">接受</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
