import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {page, userEvent} from "vitest/browser";

import {animatedProperties, stretchAnimation} from "../../helpers/overlay-motion";

import {AlertDialogFixture} from "./fixtures";

import "@/styles.css";

const renderAlertDialog = () => render(<AlertDialogFixture />);

describe("AlertDialog (browser)", () => {
  it("supports focus trap and scroll lock while open", async () => {
    await renderAlertDialog();

    await page.getByRole("button", {name: "Delete Project"}).click();

    const dialog = page.getByRole("alertdialog");

    await expect.element(dialog).toBeInTheDocument();
    expect(isDocumentScrollLocked()).toBe(true);
    expect(dialog.element().contains(document.activeElement)).toBe(true);

    await userEvent.tab();
    expect(dialog.element().contains(document.activeElement)).toBe(true);
  });

  it("supports blocked Escape and CloseTrigger with focus restore", async () => {
    await renderAlertDialog();

    const trigger = page.getByRole("button", {name: "Delete Project"});

    await trigger.click();

    const dialog = page.getByRole("alertdialog");

    await expect.element(dialog).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    await expect.element(dialog).toBeInTheDocument();

    await page.getByRole("button", {name: "Close"}).click();

    await expect.element(dialog).not.toBeInTheDocument();
    expect(isDocumentScrollLocked()).toBe(false);
    await expect.element(trigger).toHaveFocus();
  });

  it("opens with an opacity and transform only animation", async () => {
    stretchAnimation(
      '.alert-dialog__container[data-entering="true"], .alert-dialog__backdrop[data-entering="true"]',
    );
    await renderAlertDialog();
    await page.getByRole("button", {name: "Delete Project"}).click();
    await expect.element(page.getByRole("alertdialog")).toBeInTheDocument();

    const container = document.querySelector<HTMLElement>(".alert-dialog__container")!;
    const backdrop = document.querySelector<HTMLElement>(".alert-dialog__backdrop")!;
    const containerMotion = animatedProperties(container);
    const backdropMotion = animatedProperties(backdrop);

    expect(containerMotion.animation?.animationName).toMatch(/^heroui-overlay-enter-105/);
    expect(containerMotion.properties).toEqual(["opacity", "transform"]);
    expect(backdropMotion.animation?.animationName).toBe("heroui-overlay-fade-in");
    expect(backdropMotion.properties).toEqual(["opacity"]);
  });

  it("keeps the backdrop mounted until the container finishes closing", async () => {
    stretchAnimation('.alert-dialog__container[data-exiting="true"]');
    await renderAlertDialog();
    await page.getByRole("button", {name: "Delete Project"}).click();
    await expect.element(page.getByRole("alertdialog")).toBeInTheDocument();

    const openContainer = document.querySelector<HTMLElement>(".alert-dialog__container")!;

    await expect.poll(() => openContainer.getAnimations().length).toBe(0);
    await page.getByRole("button", {name: "Close"}).click();
    await new Promise((resolve) => setTimeout(resolve, 300));

    const container = document.querySelector<HTMLElement>(".alert-dialog__container")!;

    expect(document.querySelector(".alert-dialog__backdrop")).toHaveAttribute(
      "data-exiting",
      "true",
    );
    expect(container).toHaveAttribute("data-exiting", "true");

    const {animation, properties} = animatedProperties(container);

    expect(animation?.animationName).toBe("heroui-overlay-exit");
    expect(getComputedStyle(container).animationFillMode).toBe("none");
    expect(properties).toEqual(["opacity", "transform"]);
  });
});
