import {User, fireEvent, render, screen, setupUser, waitFor} from "@heroui/testing/helpers";
import {createRef} from "react";

import {Button} from "@/components/button";
import {Sheet, SheetRoot, sheetVariants} from "@/components/sheet";

import {SheetFixture} from "./fixtures";
import {setupSheetJsdom} from "./setup";

setupSheetJsdom();

describe("Sheet", () => {
  it("exposes compound exports, named exports, and variants", () => {
    expect(Sheet.Root).toBe(SheetRoot);
    expect(sheetVariants().content()).toContain("sheet__content");
    for (const part of [
      "Trigger",
      "Backdrop",
      "Content",
      "Dialog",
      "Header",
      "Heading",
      "Body",
      "Footer",
      "Handle",
      "Close",
      "CloseTrigger",
      "NestedRoot",
    ] as const)
      expect(Sheet[part]).toBeDefined();
  });

  it("supports trigger opening and explicit close with consumer callbacks", async () => {
    const onOpenChange = vi.fn();
    const onClose = vi.fn();
    const onPress = vi.fn();

    render(<SheetFixture closeProps={{onPress}} onClose={onClose} onOpenChange={onOpenChange} />);
    const tester = new User({interactionType: "mouse"}).createTester("Dialog", {
      overlayType: "modal",
      root: screen.getByRole("button", {name: "Open sheet"}),
    });

    await tester.open();
    expect(tester.getDialog()).toHaveAccessibleName("Details");
    await setupUser().click(screen.getByRole("button", {name: "Done"}));
    await waitFor(() =>
      expect(document.querySelector('[data-slot="sheet-overlay"]')).toHaveAttribute(
        "data-exiting",
        "true",
      ),
    );
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("supports controlled state without a trigger", async () => {
    const onOpenChange = vi.fn();
    const tree = (isOpen: boolean) => (
      <Sheet isOpen={isOpen} onOpenChange={onOpenChange}>
        <Sheet.Backdrop>
          <Sheet.Content>
            <Sheet.Dialog aria-label="Controlled">
              <Sheet.CloseTrigger />
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
    );
    const {rerender} = render(tree(true));

    await setupUser().click(screen.getByRole("button", {name: "Close"}));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    rerender(tree(false));
    await waitFor(() =>
      expect(document.querySelector('[data-slot="sheet-overlay"]')).toHaveAttribute(
        "data-exiting",
        "true",
      ),
    );
  });

  it("forwards refs, DOM attributes, content render props, and slot hooks", () => {
    const contentRef = createRef<HTMLDivElement>();
    const dialogRef = createRef<HTMLDivElement>();

    render(
      <Sheet defaultOpen>
        <Sheet.Backdrop>
          <Sheet.Content ref={contentRef} data-testid="panel">
            {({position}) => (
              <Sheet.Dialog ref={dialogRef} aria-label="Slots">
                <Sheet.Handle />
                <Sheet.Header>
                  <Sheet.Heading>{position}</Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>Body</Sheet.Body>
                <Sheet.Footer>Footer</Sheet.Footer>
              </Sheet.Dialog>
            )}
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>,
    );
    expect(contentRef.current).toBe(screen.getByTestId("panel"));
    expect(dialogRef.current).toBe(screen.getByRole("dialog"));
    for (const slot of [
      "overlay",
      "backdrop",
      "content",
      "dialog",
      "handle",
      "handle-bar",
      "header",
      "heading",
      "body",
      "footer",
    ])
      expect(document.querySelector(`[data-slot="sheet-${slot}"]`)).not.toBeNull();
    expect(screen.getByRole("heading")).toHaveTextContent("bottom");
  });

  it.each([1, "1", "100%"])("supports the trailing %s full-height sentinel", (sentinel) => {
    render(<SheetFixture defaultOpen snapPoints={[180, sentinel]} />);
    expect(screen.getByRole("dialog").closest('[data-slot="sheet-content"]')).toHaveAttribute(
      "data-snap-points",
    );
  });

  it.each([undefined, [], [1], ["100%"]].map((snapPoints) => ({snapPoints})))(
    "supports fully expanded sheets with $snapPoints",
    ({snapPoints}) => {
      render(<SheetFixture defaultOpen snapPoints={snapPoints} />);
      expect(screen.getByRole("dialog").closest('[data-slot="sheet-content"]')).not.toHaveAttribute(
        "data-snap-points",
      );
    },
  );

  it("supports explicit closing when dismissal is disabled", async () => {
    render(<SheetFixture defaultOpen isDismissable={false} />);
    await setupUser().keyboard("{Escape}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await setupUser().click(screen.getByRole("button", {name: "Dismiss sheet"}));
    await waitFor(() =>
      expect(document.querySelector('[data-slot="sheet-overlay"]')).toHaveAttribute(
        "data-exiting",
        "true",
      ),
    );
  });

  it("calls a close-trigger consumer handler", async () => {
    const onPress = vi.fn();

    render(
      <Sheet defaultOpen>
        <Sheet.Backdrop>
          <Sheet.Content>
            <Sheet.Dialog aria-label="Close">
              <Sheet.CloseTrigger onPress={onPress} />
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>,
    );
    await setupUser().click(screen.getByRole("button", {name: "Close"}));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("calls consumer handle events and allows preventing a drag", () => {
    const onPointerDown = vi.fn((event) => event.preventDefault());
    const onPointerMove = vi.fn();
    const onPointerUp = vi.fn();
    const onPointerCancel = vi.fn();
    const onLostPointerCapture = vi.fn();

    render(
      <SheetFixture defaultOpen>
        <Sheet.Handle
          data-testid="custom-handle"
          onLostPointerCapture={onLostPointerCapture}
          onPointerCancel={onPointerCancel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          Custom grip
        </Sheet.Handle>
      </SheetFixture>,
    );
    const handle = screen.getByTestId("custom-handle");

    fireEvent.pointerDown(handle, {button: 0, pointerId: 1});
    expect(handle).not.toHaveAttribute("data-dragging");
    expect(handle.closest("[data-sheet-scroll]")).not.toHaveAttribute("data-handle-dragging");
    fireEvent.pointerMove(handle, {pointerId: 1});
    fireEvent.pointerUp(handle, {pointerId: 1});
    fireEvent.pointerCancel(handle, {pointerId: 1});
    fireEvent.lostPointerCapture(handle, {pointerId: 1});
    for (const callback of [
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onLostPointerCapture,
    ])
      expect(callback).toHaveBeenCalledTimes(1);
    expect(handle).toHaveTextContent("Custom grip");
  });

  it("supports nested roots and rejects a nested root without a parent", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<Sheet.NestedRoot />)).toThrow(
      "Sheet.NestedRoot must be placed in another Sheet",
    );
    error.mockRestore();
    render(
      <SheetFixture defaultOpen>
        <Sheet.NestedRoot>
          <Sheet.Trigger>
            <Button>Nested</Button>
          </Sheet.Trigger>
        </Sheet.NestedRoot>
      </SheetFixture>,
    );
    expect(screen.getByRole("button", {name: "Nested"})).toBeInTheDocument();
  });
});
