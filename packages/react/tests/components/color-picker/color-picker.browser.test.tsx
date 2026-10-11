import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {ColorPicker} from "@/components/color-picker";
import {Label} from "@/components/label";

import {animatedProperties, stretchAnimation} from "../../helpers/overlay-motion";

import "@/styles.css";

const renderColorPicker = () =>
  render(
    <ColorPicker defaultValue="#0485F7">
      <ColorPicker.Trigger>
        <Label>Pick a color</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover>
        <p>Color</p>
      </ColorPicker.Popover>
    </ColorPicker>,
  );

describe("ColorPicker (browser)", () => {
  it("opens with an opacity and transform only animation", async () => {
    stretchAnimation('.color-picker__popover[data-entering="true"]');
    await renderColorPicker();
    await page.getByRole("button", {name: /Pick a color/}).click();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const popover = document.querySelector<HTMLElement>(".color-picker__popover")!;
    const {animation, properties} = animatedProperties(popover);

    expect(animation?.animationName).toMatch(/^heroui-overlay-enter-95/);
    expect(properties).toEqual(["opacity", "transform"]);
  });

  it("closes with an opacity and transform animation", async () => {
    stretchAnimation('.color-picker__popover[data-exiting="true"]');
    await renderColorPicker();
    await page.getByRole("button", {name: /Pick a color/}).click();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const openPopover = document.querySelector<HTMLElement>(".color-picker__popover")!;

    await expect.poll(() => openPopover.getAnimations().length).toBe(0);
    await userEvent.keyboard("{Escape}");

    const popover = document.querySelector<HTMLElement>(".color-picker__popover")!;

    expect(popover).toHaveAttribute("data-exiting", "true");

    const {animation, properties} = animatedProperties(popover);

    expect(animation?.animationName).toBe("heroui-overlay-exit");
    expect(getComputedStyle(popover).animationFillMode).toBe("none");
    expect(properties).toEqual(["opacity", "transform"]);
  });
});
