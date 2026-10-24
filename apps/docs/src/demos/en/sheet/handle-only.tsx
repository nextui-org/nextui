"use client";

import {Button, Sheet} from "@heroui/react";

export function HandleOnly() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Handle Only</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Swipe the sheet</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                The handle is a visual grip. Swipe anywhere on the sheet until it is fully expanded.
                After that, the body scrolls instead of moving the sheet.
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Done</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
