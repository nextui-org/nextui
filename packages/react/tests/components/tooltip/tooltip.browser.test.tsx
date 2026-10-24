import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {Button} from "@/components/button";
import {Tooltip} from "@/components/tooltip";

import {animatedProperties, stretchAnimation} from "../../helpers/overlay-motion";

import "@/styles.css";

describe("Tooltip (browser)", () => {
  it("shows content when open and dismisses with Escape", async () => {
    await render(
      <Tooltip defaultOpen delay={0}>
        <Button>Hover me</Button>
        <Tooltip.Content>Hover tip</Tooltip.Content>
      </Tooltip>,
    );

    const tooltip = page.getByRole("tooltip");

    await expect.element(tooltip).toBeInTheDocument();
    await expect.element(tooltip).toHaveTextContent("Hover tip");

    await userEvent.keyboard("{Escape}");

    await expect.element(tooltip).not.toBeInTheDocument();
  });

  it("opens with an opacity and transform only animation", async () => {
    stretchAnimation('.tooltip[data-entering="true"]');

    await render(
      <Tooltip delay={0}>
        <Button>Hover me</Button>
        <Tooltip.Content>Hover tip</Tooltip.Content>
      </Tooltip>,
    );

    page.getByRole("button", {name: "Hover me"}).element().focus();
    await expect.element(page.getByRole("tooltip")).toBeInTheDocument();

    const tooltip = document.querySelector<HTMLElement>(".tooltip")!;
    const {animation, properties} = animatedProperties(tooltip);

    expect(animation?.animationName).toMatch(/^heroui-overlay-enter-90/);
    expect(properties).toEqual(["opacity", "transform"]);
  });

  it("closes with an opacity and transform animation", async () => {
    stretchAnimation('.tooltip[data-exiting="true"]');

    await render(
      <Tooltip delay={0}>
        <Button>Hover me</Button>
        <Tooltip.Content>Hover tip</Tooltip.Content>
      </Tooltip>,
    );

    page.getByRole("button", {name: "Hover me"}).element().focus();
    await expect.element(page.getByRole("tooltip")).toBeInTheDocument();

    const openTooltip = document.querySelector<HTMLElement>(".tooltip")!;

    await expect.poll(() => openTooltip.getAnimations().length).toBe(0);
    await userEvent.keyboard("{Escape}");

    const tooltip = document.querySelector<HTMLElement>(".tooltip")!;

    expect(tooltip).toHaveAttribute("data-exiting", "true");

    const {animation, properties} = animatedProperties(tooltip);

    expect(animation?.animationName).toBe("heroui-overlay-exit");
    expect(getComputedStyle(tooltip).animationFillMode).toBe("none");
    expect(properties).toEqual(["opacity", "transform"]);
  });
});
