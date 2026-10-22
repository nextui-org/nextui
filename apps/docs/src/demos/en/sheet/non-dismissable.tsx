"use client";

import {Button, Sheet} from "@heroui/react";

export function NonDismissable() {
  return (
    <Sheet isDismissable={false}>
      <Sheet.Trigger>
        <Button variant="secondary">Important Action</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Header>
              <Sheet.Heading>Confirm Action</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                This sheet cannot be dismissed by clicking outside or dragging. You must use one of
                the buttons below.
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Cancel</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button variant="secondary">Confirm</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
