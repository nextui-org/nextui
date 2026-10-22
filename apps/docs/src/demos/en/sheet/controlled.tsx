"use client";

import {Button, Sheet} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" onPress={() => setIsOpen(true)}>
          Open Sheet
        </Button>
        <Button size="sm" variant="secondary" onPress={() => setIsOpen(!isOpen)}>
          Toggle
        </Button>
        <p className="text-xs text-muted">
          Status:{" "}
          <span className="font-mono font-medium text-foreground">
            {isOpen ? "open" : "closed"}
          </span>
        </p>
      </div>

      <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
        <Sheet.Backdrop>
          <Sheet.Content className="mx-auto max-w-[420px]">
            <Sheet.Dialog>
              <Sheet.Handle />
              <Sheet.CloseTrigger />
              <Sheet.Header>
                <Sheet.Heading>Controlled Sheet</Sheet.Heading>
              </Sheet.Header>
              <Sheet.Body>
                <p className="text-sm text-muted">
                  This sheet is controlled via <code>isOpen</code> and <code>onOpenChange</code>{" "}
                  props. The parent manages the state externally.
                </p>
              </Sheet.Body>
              <Sheet.Footer>
                <Sheet.Close>
                  <Button>Close</Button>
                </Sheet.Close>
              </Sheet.Footer>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
    </div>
  );
}
