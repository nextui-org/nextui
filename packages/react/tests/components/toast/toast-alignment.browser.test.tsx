import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {Button} from "@/components/button";
import {Toast, ToastQueue} from "@/components/toast";

import "@/styles.css";

const verticalCenter = (element: Element) => {
  const rect = element.getBoundingClientRect();

  return rect.top + rect.height / 2;
};

/** Title center minus indicator center. Zero means the icon and the single-line title line up. */
const centerDelta = (toast: Element) => {
  const indicator = toast.querySelector('[data-slot="toast-indicator"]')!;
  const title = toast.querySelector('[data-slot="toast-title"]')!;

  return verticalCenter(title) - verticalCenter(indicator);
};

/** Border-box height of the in-flow content, ignoring the expanded hit area. */
const naturalHeight = (toast: HTMLElement) => {
  const previousHeight = toast.style.height;

  toast.style.height = "auto";

  const height = toast.offsetHeight;

  toast.style.height = previousHeight;

  return height;
};

const toastsNamed = (title: string) =>
  [...document.querySelectorAll('[data-slot="toast"]')].filter(
    (toast) => toast.querySelector('[data-slot="toast-title"]')?.textContent === title,
  );

describe("Toast (browser)", () => {
  // Regression: a toast spawned while the region is expanded was measured with
  // scrollHeight, which includes the ::after hit area. The extra height stretched
  // the grid row and the centered title dropped below the indicator.
  it("keeps the indicator aligned with the title when a toast is spawned from inside the stack", async () => {
    const queue = new ToastQueue();

    await render(
      <>
        <Button
          onPress={() => {
            queue.add(
              {
                description: (
                  <Button
                    size="sm"
                    variant="secondary"
                    onPress={() => {
                      queue.add({title: "Spawned success", variant: "success"}, {timeout: 0});
                    }}
                  >
                    Spawn success toast
                  </Button>
                ),
                title: "Interactive danger",
                variant: "danger",
              },
              {timeout: 0},
            );
          }}
        >
          Create danger
        </Button>
        <Toast.Provider placement="top end" queue={queue} />
      </>,
    );

    await page.getByRole("button", {name: "Create danger"}).click();
    await expect.element(page.getByText("Interactive danger")).toBeInTheDocument();

    await page.getByRole("button", {name: "Spawn success toast"}).click();
    await page.getByRole("button", {name: "Spawn success toast"}).click();

    await expect.poll(() => document.querySelectorAll('[data-slot="toast"]').length).toBe(3);
    await expect
      .poll(() =>
        document.querySelector('[data-slot="toast-region"]')?.getAttribute("data-expanded"),
      )
      .toBe("true");

    const spawned = toastsNamed("Spawned success");

    expect(spawned).toHaveLength(2);

    for (const toast of spawned) {
      const element = toast as HTMLElement;

      expect(element.getAttribute("data-expanded")).toBe("true");
      expect(Math.abs(centerDelta(element))).toBeLessThan(1);
      expect(Number.parseFloat(element.style.getPropertyValue("--toast-height"))).toBe(
        naturalHeight(element),
      );
    }

    const danger = toastsNamed("Interactive danger")[0]!;
    const dangerTitle = danger.querySelector('[data-slot="toast-title"]')!.getBoundingClientRect();
    const dangerIndicator = danger
      .querySelector('[data-slot="toast-indicator"]')!
      .getBoundingClientRect();

    // A description keeps the icon on the first line, not centered on the whole block.
    expect(Math.abs(dangerTitle.top - dangerIndicator.top)).toBeLessThan(1);
  });
});
