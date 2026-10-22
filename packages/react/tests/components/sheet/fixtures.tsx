import type {ComponentPropsWithRef, ReactNode} from "react";

import {Button} from "@/components/button";
import {Sheet} from "@/components/sheet";

export function SheetFixture({
  backdropProps,
  children,
  closeProps,
  contentProps,
  dialogProps,
  ...props
}: Sheet["Props"] & {
  backdropProps?: Sheet["BackdropProps"];
  closeProps?: ComponentPropsWithRef<typeof Button>;
  contentProps?: Sheet["ContentProps"];
  dialogProps?: Sheet["DialogProps"];
  children?: ReactNode;
}) {
  return (
    <Sheet {...props}>
      <Sheet.Trigger>
        <Button>Open sheet</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop {...backdropProps}>
        <Sheet.Content {...contentProps}>
          <Sheet.Dialog {...dialogProps}>
            <Sheet.CloseTrigger aria-label="Dismiss sheet" />
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Details</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>{children ?? <p>Sheet content</p>}</Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button {...closeProps}>Done</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}
