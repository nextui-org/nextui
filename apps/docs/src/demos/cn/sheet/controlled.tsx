"use client";

import {Button, Sheet} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" onPress={() => setIsOpen(true)}>
          打开面板
        </Button>
        <Button size="sm" variant="secondary" onPress={() => setIsOpen(!isOpen)}>
          切换
        </Button>
        <p className="text-xs text-muted">
          状态：{" "}
          <span className="font-mono font-medium text-foreground">
            {isOpen ? "已打开" : "已关闭"}
          </span>
        </p>
      </div>

      <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
        <Sheet.Backdrop>
          <Sheet.Content className="mx-auto max-w-[420px]">
            <Sheet.Dialog>
              <Sheet.Handle />
              <Sheet.CloseTrigger aria-label="关闭面板" />
              <Sheet.Header>
                <Sheet.Heading>受控面板</Sheet.Heading>
              </Sheet.Header>
              <Sheet.Body>
                <p className="text-sm text-muted">
                  通过 <code>isOpen</code> 和 <code>onOpenChange</code>{" "}
                  属性控制面板，由父组件在外部管理状态。
                </p>
              </Sheet.Body>
              <Sheet.Footer>
                <Sheet.Close>
                  <Button>关闭</Button>
                </Sheet.Close>
              </Sheet.Footer>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
    </div>
  );
}
