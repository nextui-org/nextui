import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {PopoverFixture} from "./fixtures";

import "@/styles.css";

const renderPopover = () => render(<PopoverFixture />);

describe("Popover (browser)", () => {
  it("supports focus move into dialog and Escape restore", async () => {
    await renderPopover();

    const trigger = page.getByRole("button", {name: "Open popover"});

    await trigger.click();

    const dialog = page.getByRole("dialog");

    await expect.element(dialog).toBeInTheDocument();
    expect(dialog.element().contains(document.activeElement)).toBe(true);

    await userEvent.keyboard("{Escape}");

    await expect.element(dialog).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  /**
   * WebKit reports this animation as pending in the same frame React Aria checks
   * `getAnimations()`, then unmounts. The popover has to stay through the exit.
   */
  it("stays mounted through its close animation", async () => {
    const style = document.createElement("style");

    style.textContent = '.popover[data-exiting="true"] { animation-duration: 10s !important; }';
    document.head.append(style);
    onTestFinished(() => style.remove());

    await renderPopover();
    await page.getByRole("button", {name: "Open popover"}).click();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const openPopover = document.querySelector<HTMLElement>(".popover");

    await expect.poll(() => openPopover?.getAnimations().length).toBe(0);
    await userEvent.keyboard("{Escape}");

    const popover = document.querySelector<HTMLElement>(".popover");

    expect(popover).toHaveAttribute("data-exiting", "true");

    const animation = popover
      ?.getAnimations()
      .find((item): item is CSSAnimation => item instanceof CSSAnimation);

    expect(animation?.animationName).toBe("heroui-overlay-exit");
    // `forwards` / `both` make WebKit skip the close animation.
    expect(getComputedStyle(popover!).animationFillMode).toBe("none");
  });
});
