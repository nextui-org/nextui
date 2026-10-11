import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {DropdownFixture, DropdownToModalFixture, ModalWithDropdownFixture} from "./fixtures";

import "@/styles.css";

const renderDropdown = () => render(<DropdownFixture />);

const getDropdownPopover = () => {
  const popover = document.querySelector<HTMLElement>('[data-slot="dropdown-popover"]');

  if (!popover) throw new Error("Expected the dropdown popover to be mounted");

  return popover;
};

const getModalBackdrop = () => {
  const backdrop = document.querySelector<HTMLElement>('[data-slot="modal-backdrop"]');

  if (!backdrop) throw new Error("Expected the modal backdrop to be mounted");

  return backdrop;
};

/** Whatever a click at the center of `element` would actually land on. */
const topmostElementOver = (element: HTMLElement) => {
  const {height, left, top, width} = element.getBoundingClientRect();

  return document.elementFromPoint(left + width / 2, top + height / 2);
};

/** Both overlays sit at the same z-index, so the one later in the document paints on top. */
const paintsOnTopOf = (element: HTMLElement, other: HTMLElement) =>
  Boolean(other.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING);

/**
 * Holds the popover in its exit animation so the window where both overlays are on screen stays
 * observable. Only the duration is stretched — never the z-index or pointer-events under test.
 */
const holdPopoverExitAnimation = () => {
  const style = document.createElement("style");

  style.textContent =
    '.dropdown__popover[data-exiting="true"] { animation-duration: 10s !important; }';
  document.head.append(style);

  onTestFinished(() => style.remove());
};

describe("Dropdown (browser)", () => {
  it("opens the menu, shows items, and restores focus to the trigger after Escape", async () => {
    await renderDropdown();

    const trigger = page.getByRole("button", {name: "Menu"});

    await trigger.click();

    const menu = page.getByRole("menu");

    await expect.element(menu).toBeInTheDocument();
    await expect.element(page.getByRole("menuitem", {name: "New file"})).toBeInTheDocument();
    await expect.element(page.getByRole("menuitem", {name: "Copy link"})).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    await expect.element(menu).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  /**
   * Mobile open jank: tw-animate-css keyframes always animate `filter`, a GPU pass that outlasts
   * the animation on mid-range phones. Overlay motion must stay on opacity and transform.
   */
  it("opens with an opacity and transform only animation", async () => {
    const style = document.createElement("style");

    // Stretch the enter so the running animation can be inspected; only the duration changes.
    style.textContent =
      '.dropdown__popover[data-entering="true"] { animation-duration: 10s !important; }';
    document.head.append(style);
    onTestFinished(() => style.remove());

    await renderDropdown();
    await page.getByRole("button", {name: "Menu"}).click();
    await expect.element(page.getByRole("menu")).toBeInTheDocument();

    const popover = getDropdownPopover();
    const animation = popover
      .getAnimations()
      .find((item): item is CSSAnimation => item instanceof CSSAnimation);

    expect(animation?.animationName).toMatch(/^heroui-overlay-enter-90/);

    const animatedProperties = new Set(
      (animation?.effect as KeyframeEffect)
        .getKeyframes()
        .flatMap((keyframe) =>
          Object.keys(keyframe).filter(
            (property) => !["composite", "computedOffset", "easing", "offset"].includes(property),
          ),
        ),
    );

    expect([...animatedProperties].sort()).toEqual(["opacity", "transform"]);
  });

  /**
   * WebKit reports this animation as pending in the same frame React Aria checks
   * `getAnimations()`, then unmounts. The menu has to stay through the exit.
   */
  it("closes with an opacity and transform animation", async () => {
    const style = document.createElement("style");

    style.textContent =
      '.dropdown__popover[data-exiting="true"] { animation-duration: 10s !important; }';
    document.head.append(style);
    onTestFinished(() => style.remove());

    await renderDropdown();
    await page.getByRole("button", {name: "Menu"}).click();
    await expect.element(page.getByRole("menu")).toBeInTheDocument();

    const openPopover = getDropdownPopover();

    await expect.poll(() => openPopover.getAnimations().length).toBe(0);
    await userEvent.keyboard("{Escape}");

    const popover = getDropdownPopover();

    expect(popover).toHaveAttribute("data-exiting", "true");

    const animation = popover
      .getAnimations()
      .find((item): item is CSSAnimation => item instanceof CSSAnimation);

    expect(animation?.animationName).toBe("heroui-overlay-exit");
    // `forwards` / `both` make WebKit skip the close animation.
    expect(getComputedStyle(popover).animationFillMode).toBe("none");

    const animatedProperties = new Set(
      (animation?.effect as KeyframeEffect)
        .getKeyframes()
        .flatMap((keyframe) =>
          Object.keys(keyframe).filter(
            (property) => !["composite", "computedOffset", "easing", "offset"].includes(property),
          ),
        ),
    );

    expect([...animatedProperties].sort()).toEqual(["opacity", "transform"]);
  });

  /**
   * Stacking half of the leftover overlay reported in #6344 and #6361. These assertions need the
   * compiled design-system CSS, which is why they live here rather than in the jsdom suite.
   * `.modal__backdrop`, `.alert-dialog__backdrop` and `.drawer__backdrop` share one z-index token,
   * so the Modal stands in for all three.
   */
  describe("handing off to a modal-level overlay", () => {
    it("paints a Modal above the popover that is still closing behind it", async () => {
      await render(<DropdownToModalFixture />);
      holdPopoverExitAnimation();

      await page.getByRole("button", {name: "Menu"}).click();
      await page.getByRole("menuitem", {name: "Open modal"}).click();

      await expect
        .element(page.getByRole("dialog", {name: "Modal from dropdown"}))
        .toBeInTheDocument();

      const popover = getDropdownPopover();
      const backdrop = getModalBackdrop();

      // Still mid-exit, so this is the window where the leftover overlay used to show up.
      expect(popover).toHaveAttribute("data-exiting", "true");

      // React Aria hard-codes the popover's z-index inline, so the backdrop can only win by
      // matching that value and mounting later.
      expect(getComputedStyle(backdrop).zIndex).toBe(getComputedStyle(popover).zIndex);
      expect(paintsOnTopOf(backdrop, popover)).toBe(true);

      // A click where the popover still shows reaches the modal instead.
      expect(popover.contains(topmostElementOver(popover))).toBe(false);
      expect(getComputedStyle(popover).pointerEvents).toBe("none");
    });

    // Guard against over-correcting the above by lifting modal-level overlays past popovers.
    it("keeps a popover opened inside a Modal clickable above that Modal", async () => {
      await render(<ModalWithDropdownFixture />);

      await page.getByRole("button", {name: "Open modal"}).click();
      await expect
        .element(page.getByRole("dialog", {name: "Modal with dropdown"}))
        .toBeInTheDocument();

      await page.getByRole("button", {name: "Menu"}).click();
      await expect.element(page.getByRole("menu")).toBeInTheDocument();

      const popover = getDropdownPopover();

      expect(popover.contains(topmostElementOver(popover))).toBe(true);
    });
  });
});
