"use client";

import {Button, Sheet} from "@heroui/react";

export function BackdropVariants() {
  const variants = ["opaque", "blur", "transparent"] as const;

  const labels = {blur: "模糊", opaque: "不透明", transparent: "透明"};

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((v) => (
        <Sheet key={v}>
          <Sheet.Trigger>
            <Button variant="secondary">{labels[v]}</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant={v}>
            <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
              <Sheet.Dialog>
                <Sheet.Handle />
                <Sheet.CloseTrigger aria-label="关闭面板" />
                <Sheet.Header>
                  <Sheet.Heading>背景：{labels[v]}</Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <p className="text-sm text-muted">
                    此面板使用 <code className="text-foreground">{v}</code> 背景变体。
                  </p>
                </Sheet.Body>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button className="w-full">关闭</Button>
                  </Sheet.Close>
                </Sheet.Footer>
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}
