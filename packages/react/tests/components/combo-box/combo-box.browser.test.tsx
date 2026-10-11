import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {animatedProperties, stretchAnimation} from "../../helpers/overlay-motion";

import {ComboBoxFixture} from "./fixtures";

// The popover item padding lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

/** How far the option's content box runs under its indicator, which is absolutely positioned
 * and therefore only kept off the label by the item's inline-end padding. */
const indicatorOverlapOf = (name: string) => {
  const option = page.getByRole("option", {name}).element();
  const indicator = option.querySelector('[data-slot="list-box-item-indicator"]')!;
  const contentEnd =
    option.getBoundingClientRect().right - parseFloat(getComputedStyle(option).paddingInlineEnd);

  return contentEnd - indicator.getBoundingClientRect().left;
};

describe("ComboBox (browser)", () => {
  describe("overlay motion", () => {
    it("opens with an opacity and transform only animation", async () => {
      stretchAnimation('.combo-box__popover[data-entering="true"]');
      await render(<ComboBoxFixture />);
      await page.getByRole("button", {name: "Show suggestions"}).click();
      await expect.element(page.getByRole("listbox")).toBeInTheDocument();

      const popover = document.querySelector<HTMLElement>(".combo-box__popover")!;
      const {animation, properties} = animatedProperties(popover);

      expect(animation?.animationName).toMatch(/^heroui-overlay-enter-95/);
      expect(properties).toEqual(["opacity", "transform"]);
    });

    it("closes with an opacity and transform animation", async () => {
      stretchAnimation('.combo-box__popover[data-exiting="true"]');
      await render(<ComboBoxFixture />);
      await page.getByRole("button", {name: "Show suggestions"}).click();
      await expect.element(page.getByRole("listbox")).toBeInTheDocument();

      const openPopover = document.querySelector<HTMLElement>(".combo-box__popover")!;

      await expect.poll(() => openPopover.getAnimations().length).toBe(0);
      await userEvent.keyboard("{Escape}");

      const popover = document.querySelector<HTMLElement>(".combo-box__popover")!;

      expect(popover).toHaveAttribute("data-exiting", "true");

      const {animation, properties} = animatedProperties(popover);

      expect(animation?.animationName).toBe("heroui-overlay-exit");
      expect(getComputedStyle(popover).animationFillMode).toBe("none");
      expect(properties).toEqual(["opacity", "transform"]);
    });
  });

  describe("item indicator", () => {
    it("reserves room for the indicator so it never sits on the label", async () => {
      await render(<ComboBoxFixture defaultValue="dog" />);

      await page.getByRole("button", {name: "Show suggestions"}).click();
      await expect.element(page.getByRole("listbox")).toBeInTheDocument();

      expect(indicatorOverlapOf("Dog")).toBeLessThanOrEqual(0);
    });
  });
});
