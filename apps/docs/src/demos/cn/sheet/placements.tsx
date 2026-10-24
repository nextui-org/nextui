"use client";

import {Button, Sheet} from "@heroui/react";

export function Placements() {
  const placements = ["bottom", "top", "left", "right"] as const;

  const labels = {bottom: "底部", left: "左侧", right: "右侧", top: "顶部"};

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((p) => (
        <Sheet key={p} placement={p}>
          <Sheet.Trigger>
            <Button variant="secondary">{labels[p]}</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant="blur">
            <Sheet.Content className={p === "left" || p === "right" ? "w-[400px]" : undefined}>
              <Sheet.Dialog>
                <Sheet.CloseTrigger aria-label="关闭面板" />
                {p === "bottom" && <Sheet.Handle />}
                <Sheet.Header>
                  <Sheet.Heading>{labels[p]}面板</Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <p className="text-sm text-muted">
                    此面板以流畅的动画从屏幕的<strong>{labels[p]}</strong>滑入。
                  </p>
                </Sheet.Body>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button variant="secondary">取消</Button>
                  </Sheet.Close>
                  <Sheet.Close>
                    <Button variant="secondary">完成</Button>
                  </Sheet.Close>
                </Sheet.Footer>
                {p === "top" && <Sheet.Handle />}
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}
