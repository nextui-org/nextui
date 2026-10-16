import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {animatedProperties, stretchAnimation} from "../../helpers/overlay-motion";

import {PopoverFixture} from "./fixtures";

// Deliberately omit the full HeroUI stylesheet: base + theme + a single component.
import "./selective-imports.css";

describe("Popover (browser)", () => {
  it("supports enter and exit animations with selective stylesheet imports", async () => {
    stretchAnimation('.popover[data-entering="true"], .popover[data-exiting="true"]');
    await render(<PopoverFixture />);
    await page.getByRole("button", {name: "Open popover"}).click();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const popover = document.querySelector<HTMLElement>(".popover")!;
    const enter = animatedProperties(popover);

    expect(enter.animation?.animationName).toMatch(/^heroui-overlay-enter-90/);
    expect(enter.properties).toEqual(["opacity", "transform"]);
    enter.animation!.finish();
    await expect.poll(() => popover.hasAttribute("data-entering")).toBe(false);

    await userEvent.keyboard("{Escape}");
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveAttribute("data-exiting", "true");
    const exit = animatedProperties(popover);

    expect(exit.animation?.animationName).toBe("heroui-overlay-exit");
    expect(exit.properties).toEqual(["opacity", "transform"]);
    exit.animation!.finish();
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
  });
});
