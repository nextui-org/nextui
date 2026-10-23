import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {page, userEvent} from "vitest/browser";

import {Modal} from "@/components/modal";

import {animatedProperties, stretchAnimation} from "../../helpers/overlay-motion";

import {ModalFixture} from "./fixtures";

import "@/styles.css";

const renderModal = () => render(<ModalFixture />);

describe("Modal (browser)", () => {
  it("supports reopening a retained backdrop and container with their original opacity", async () => {
    const fixture = (isOpen: boolean, isExiting = false) => (
      <Modal.Backdrop isExiting={isExiting} isOpen={isOpen} style={{opacity: 0.8}}>
        <Modal.Container className="opacity-90">
          <Modal.Dialog aria-label="Retained modal">Content</Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    );
    const view = await render(fixture(true));
    const backdrop = document.querySelector<HTMLElement>(".modal__backdrop")!;
    const container = document.querySelector<HTMLElement>(".modal__container")!;

    await expect.poll(() => backdrop.getAnimations({subtree: true}).length).toBe(0);
    await view.rerender(fixture(false, true));
    await expect.poll(() => backdrop.getAnimations({subtree: true}).length).toBe(0);
    await view.rerender(fixture(true));

    expect(document.querySelector(".modal__backdrop")).toBe(backdrop);
    expect(document.querySelector(".modal__container")).toBe(container);
    await expect.poll(() => getComputedStyle(backdrop).opacity).toBe("0.8");
    await expect.poll(() => getComputedStyle(container).opacity).toBe("0.9");
    await expect.element(page.getByRole("dialog", {name: "Retained modal"})).toBeVisible();
  });

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

  it("opens with an opacity and transform only animation", async () => {
    stretchAnimation(
      '.modal__container[data-entering="true"], .modal__backdrop[data-entering="true"]',
    );
    await renderModal();
    await page.getByRole("button", {name: "Open modal"}).click();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const container = document.querySelector<HTMLElement>(".modal__container")!;
    const backdrop = document.querySelector<HTMLElement>(".modal__backdrop")!;
    const containerMotion = animatedProperties(container);
    const backdropMotion = animatedProperties(backdrop);

    expect(containerMotion.animation?.animationName).toMatch(/^heroui-overlay-enter-105/);
    expect(containerMotion.properties).toEqual(["opacity", "transform"]);
    expect(backdropMotion.animation?.animationName).toBe("heroui-overlay-fade-in");
    expect(backdropMotion.properties).toEqual(["opacity"]);
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
    expect(animatedProperties(container!).properties).toEqual(["opacity", "transform"]);
  });
});
