"use client";

import {Button, Sheet} from "@heroui/react";

export function Detached() {
  const placements = ["bottom", "top", "left", "right"] as const;

  const labels = {bottom: "底部", left: "左侧", right: "右侧", top: "顶部"};

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((p) => (
        <Sheet key={p} isDetached placement={p}>
          <Sheet.Trigger>
            <Button variant="secondary">{labels[p]}</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop>
            <Sheet.Content
              className={p === "left" || p === "right" ? "w-[310px]" : "mx-auto max-w-[420px]"}
            >
              <Sheet.Dialog className={p === "left" || p === "right" ? "h-full" : undefined}>
                {p === "bottom" && <Sheet.Handle />}
                <Sheet.Body className="flex flex-col gap-4 py-5">
                  <Sheet.Heading>悬浮面板：{labels[p]}</Sheet.Heading>
                  <p className="text-sm text-muted">面板悬浮于视口边缘内侧，四个角均为圆角。</p>
                </Sheet.Body>
                {p === "top" && <Sheet.Handle />}
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}
