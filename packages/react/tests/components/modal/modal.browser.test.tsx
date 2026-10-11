import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {page, userEvent} from "vitest/browser";

import {ModalFixture} from "./fixtures";

import "@/styles.css";

const renderModal = () => render(<ModalFixture />);

describe("Modal (browser)", () => {
  it("supports focus trap, scroll lock, and Escape focus restore", async () => {
    await renderModal();

    const trigger = page.getByRole("button", {name: "Open modal"});

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

  it("supports focus restore after CloseTrigger", async () => {
    await renderModal();

    const trigger = page.getByRole("button", {name: "Open modal"});

    await trigger.click();

    const dialog = page.getByRole("dialog");

    await expect.element(dialog).toBeInTheDocument();

    await page.getByRole("button", {name: "Close"}).click();

    await expect.element(dialog).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  /**
   * React Aria only accepts `isExiting` on the backdrop, so the hold there has to wait
   * for the container's own exit animation, not just the shorter backdrop fade.
   */
  it("keeps the backdrop mounted until the container finishes closing", async () => {
    const style = document.createElement("style");

    style.textContent =
      '.modal__container[data-exiting="true"] { animation-duration: 10s !important; }';
    document.head.append(style);
    onTestFinished(() => style.remove());

    await renderModal();
    await page.getByRole("button", {name: "Open modal"}).click();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const openContainer = document.querySelector<HTMLElement>(".modal__container");

    await expect.poll(() => openContainer?.getAnimations().length).toBe(0);
    await userEvent.keyboard("{Escape}");

    // Well past the 100ms backdrop fade.
    await new Promise((resolve) => setTimeout(resolve, 300));

    const container = document.querySelector<HTMLElement>(".modal__container");

    expect(document.querySelector(".modal__backdrop")).toHaveAttribute("data-exiting", "true");
    expect(container).toHaveAttribute("data-exiting", "true");

    const animation = container
      ?.getAnimations()
      .find((item): item is CSSAnimation => item instanceof CSSAnimation);

    expect(animation?.animationName).toBe("heroui-overlay-exit");
    expect(getComputedStyle(container!).animationFillMode).toBe("none");
  });
});
