import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {Button} from "@/components/button";
import {Modal} from "@/components/modal";

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
  it("preserves sibling Tab handoff, selection and Escape", async () => {
    const onChange = vi.fn();

    await render(
      <div className="mx-auto mt-32 w-64">
        <div data-testid="first">
          <ComboBoxFixture />
        </div>
        <div data-testid="second">
          <ComboBoxFixture onChange={onChange} />
        </div>
        <Button>Submit</Button>
      </div>,
    );
    const first = page.elementLocator(page.getByTestId("first").getByRole("combobox").element());
    const second = page.elementLocator(page.getByTestId("second").getByRole("combobox").element());

    await first.click();
    await expect.element(first).toHaveAttribute("aria-expanded", "true");
    await userEvent.tab();
    await expect.element(second).toHaveFocus();
    await expect.element(first).toHaveAttribute("aria-expanded", "false");
    await expect.element(second).toHaveAttribute("aria-expanded", "true");
    await expect.poll(() => document.querySelectorAll(".combo-box__popover").length).toBe(1);
    await expect
      .poll(() => document.querySelector(".combo-box__popover")?.getAnimations().length)
      .toBe(0);
    await userEvent.keyboard("{ArrowDown}");
    await expect.poll(() => second.element().getAttribute("aria-activedescendant")).toBeTruthy();
    await userEvent.keyboard("{Enter}");
    await expect.poll(() => onChange.mock.calls.length).toBeGreaterThan(0);
    await expect.element(second).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}{Escape}");
    await expect.element(second).toHaveAttribute("aria-expanded", "false");
    await userEvent.tab();
    await expect.element(page.getByRole("button", {name: "Submit"})).toHaveFocus();
    expect(document.querySelector('[data-slot="combo-box"][aria-hidden="true"]')).toBeNull();
  });

  it("preserves an enclosing modal's isolation while the combobox is open", async () => {
    await render(
      <>
        <Button data-testid="background">Background action</Button>
        <Modal>
          <Button>Open form</Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog>
                <Modal.Heading>Choose an animal</Modal.Heading>
                <ComboBoxFixture />
                <Button slot="close">Done</Button>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </>,
    );
    await page.getByRole("button", {name: "Open form"}).click();
    await page.getByRole("combobox").click();
    await expect.element(page.getByRole("listbox")).toBeInTheDocument();
    expect(
      page.getByTestId("background").element().closest('[aria-hidden="true"], [inert]'),
    ).not.toBeNull();
    await userEvent.keyboard("{Escape}");
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();
    await page.getByRole("button", {name: "Done"}).click();
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
    expect(
      page.getByTestId("background").element().closest('[aria-hidden="true"], [inert]'),
    ).toBeNull();
  });
  it("scrolls the controlled listbox with arrow keys without adding a popup Tab stop", async () => {
    const items = Array.from({length: 40}, (_, index) => ({
      id: `animal-${index}`,
      name: `Animal ${index}`,
    }));

    await render(
      <div className="mx-auto mt-32 w-64">
        <ComboBoxFixture items={items} />
        <Button>Continue</Button>
      </div>,
    );
    await page.getByRole("button", {name: "Show suggestions"}).click();
    const input = page.getByRole("combobox");
    const listbox = page.getByRole("listbox");

    await expect.element(listbox).toBeInTheDocument();
    expect(input.element().getAttribute("aria-controls")).toBe(listbox.element().id);
    await expect
      .poll(() => listbox.element().scrollHeight - listbox.element().clientHeight)
      .toBeGreaterThan(0);
    await expect.element(input).toHaveFocus();
    await expect
      .poll(() => document.querySelector(".combo-box__popover")?.getAnimations().length)
      .toBe(0);
    for (let index = 0; index < 30; index++) {
      const previousId = input.element().getAttribute("aria-activedescendant");

      await userEvent.keyboard("{ArrowDown}");
      await expect
        .poll(() => input.element().getAttribute("aria-activedescendant"))
        .not.toBe(previousId);
    }
    await expect.element(input).toHaveFocus();
    await expect.poll(() => listbox.element().scrollTop).toBeGreaterThan(0);
    await userEvent.tab();
    await expect.element(page.getByRole("button", {name: "Continue"})).toHaveFocus();
    await expect.element(listbox).not.toBeInTheDocument();
  });
});
