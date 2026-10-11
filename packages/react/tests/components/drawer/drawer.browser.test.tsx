import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {page, userEvent} from "vitest/browser";

import {DrawerFixture} from "./fixtures";

// The exit transition lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

const renderDrawer = () => render(<DrawerFixture />);

describe("Drawer (browser)", () => {
  it("supports focus trap, scroll lock, and Escape focus restore", async () => {
    await renderDrawer();

    const trigger = page.getByRole("button", {name: "Open Drawer"});

    await trigger.click();

    const dialog = page.getByRole("dialog");

    await expect.element(dialog).toBeInTheDocument();
    expect(isDocumentScrollLocked()).toBe(true);
    expect(dialog.element().contains(document.activeElement)).toBe(true);

    await userEvent.tab();
    expect(dialog.element().contains(document.activeElement)).toBe(true);

    await userEvent.keyboard("{Escape}");

    await expect.element(dialog).not.toBeInTheDocument();
    expect(isDocumentScrollLocked()).toBe(false);
    await expect.element(trigger).toHaveFocus();
  });

  it("runs the exit transition after a swipe-to-dismiss", async () => {
    await render(<DrawerFixture placement="bottom" />);

    await page.getByRole("button", {name: "Open Drawer"}).click();

    const dialog = page.getByRole("dialog");

    await expect.element(dialog).toBeInTheDocument();

    const element = dialog.element() as HTMLElement;

    // Let the enter transition settle so the drag starts from a resting drawer.
    await expect.poll(() => element.getAnimations().length).toBe(0);

    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const startY = rect.top + 8;
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const dispatch = (type: string, y: number) =>
      element.dispatchEvent(
        new PointerEvent(type, {
          bubbles: true,
          button: 0,
          clientX: x,
          clientY: y,
          isPrimary: true,
          pointerId: 1,
          pointerType: "touch",
        }),
      );

    // Synthetic pointer events have no live pointer to capture.
    element.setPointerCapture = () => {};
    element.releasePointerCapture = () => {};

    dispatch("pointerdown", startY);
    dispatch("pointermove", startY + 40);
    await wait(20);
    dispatch("pointermove", startY + rect.height);
    // A real finger rests for at least a frame before lifting.
    await wait(50);
    dispatch("pointerup", startY + rect.height);

    // `transition: none` is applied while dragging. If it outlives the drag, no transition
    // runs on exit and the drawer unmounts without sliding out.
    await expect
      .poll(() =>
        element
          .getAnimations()
          .some((animation) => (animation as CSSTransition).transitionProperty === "translate"),
      )
      .toBe(true);

    await expect.element(dialog).not.toBeInTheDocument();
  });
});
