"use client";

import {Button, Sheet} from "@heroui/react";

export function BackdropVariants() {
  const variants = ["opaque", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((v) => (
        <Sheet key={v}>
          <Sheet.Trigger>
            <Button variant="secondary">{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant={v}>
            <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
              <Sheet.Dialog>
                <Sheet.Handle />
                <Sheet.CloseTrigger />
                <Sheet.Header>
                  <Sheet.Heading>Backdrop: {v.charAt(0).toUpperCase() + v.slice(1)}</Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <p className="text-sm text-muted">
                    This sheet uses the <code className="text-foreground">{v}</code> backdrop
                    variant.
                  </p>
                </Sheet.Body>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button className="w-full">Close</Button>
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
