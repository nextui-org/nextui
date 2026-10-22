"use client";

import {Button, Sheet} from "@heroui/react";

export function ScrollableContent() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Terms &amp; Conditions</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Terms &amp; Conditions</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              {Array.from({length: 20}).map((_, i) => (
                <p key={i} className="mb-3 text-sm text-muted">
                  Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                  risus, sed porttitor quam. Donec nec vestibulum libero.
                </p>
              ))}
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Decline</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button variant="secondary">Accept</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
