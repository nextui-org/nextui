import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {Toast, ToastQueue} from "@/components/toast";

import "@/styles.css";

const SM_BREAKPOINT = 640;

const renderToastWithAction = () => {
  const queue = new ToastQueue();

  return render(
    <>
      <button
        type="button"
        onClick={() =>
          queue.add(
            {
              actionProps: {children: "Undo"},
              description: "Your draft was saved",
              title: "Saved",
            },
            {timeout: 0},
          )
        }
      >
        Show toast
      </button>
      <Toast.Provider queue={queue} />
    </>,
  );
};

const showToast = async () => {
  await page.getByRole("button", {name: "Show toast"}).click();
  await expect.element(page.getByRole("alertdialog")).toBeInTheDocument();

  return {
    action: page.getByRole("button", {name: "Undo"}).element().getBoundingClientRect(),
    description: page.getByText("Your draft was saved").element().getBoundingClientRect(),
    title: page.getByText("Saved", {exact: true}).element().getBoundingClientRect(),
  };
};

const renderDangerToast = () => {
  const queue = new ToastQueue();

  return render(
    <>
      <button
        type="button"
        onClick={() =>
          queue.add(
            {
              actionProps: {children: "Remove"},
              description:
                "Remove files to release space. Adding more text to demonstrate longer content display",
              title: "Storage is full",
              variant: "danger",
            },
            {timeout: 0},
          )
        }
      >
        Show toast
      </button>
      <Toast.Provider queue={queue} />
    </>,
  );
};

describe("Toast action button (browser)", () => {
  describe("placement", () => {
    it("stacks the action below the description under the sm breakpoint", async () => {
      await page.viewport(SM_BREAKPOINT - 100, 800);
      await renderToastWithAction();

      const {action, description, title} = await showToast();

      expect(action.top).toBeGreaterThanOrEqual(description.bottom);
      // The wrapped action is indented past the indicator so it lines up with the title.
      expect(action.left).toBeCloseTo(title.left, 0);
    });

    // Regression: the action used to switch position at 768px while every other
    // mobile toast style switched at the sm breakpoint, so between the two it
    // rendered stacked but with its stacked top margin stripped by `sm:mt-0`.
    it("keeps the action inline between the sm breakpoint and 768px", async () => {
      await page.viewport(700, 800);
      await renderToastWithAction();

      const {action, description} = await showToast();

      expect(action.left).toBeGreaterThanOrEqual(description.right);
      expect(action.top).toBeLessThan(description.bottom);
    });

    // Regression: flex-wrap measured the unwrapped description and dropped the
    // content block under the indicator, so a long danger toast put the icon
    // and the title on separate rows.
    it.each([SM_BREAKPOINT - 100, 700])(
      "keeps the indicator beside a long title at %ipx",
      async (width) => {
        await page.viewport(width, 800);
        await renderDangerToast();
        await page.getByRole("button", {name: "Show toast"}).click();
        await expect.element(page.getByRole("alertdialog")).toBeInTheDocument();

        const indicator = document
          .querySelector('[data-slot="toast-indicator"]')!
          .getBoundingClientRect();
        const title = page.getByText("Storage is full").element().getBoundingClientRect();

        expect(title.left).toBeGreaterThanOrEqual(indicator.right);
        expect(title.top).toBeLessThan(indicator.bottom);
      },
    );

    it("keeps the stacked action as wide as its label and aligned with the title", async () => {
      await page.viewport(SM_BREAKPOINT - 100, 800);
      await renderDangerToast();
      await page.getByRole("button", {name: "Show toast"}).click();
      await expect.element(page.getByRole("alertdialog")).toBeInTheDocument();

      const action = page.getByRole("button", {name: "Remove"}).element().getBoundingClientRect();
      const content = document
        .querySelector('[data-slot="toast-content"]')!
        .getBoundingClientRect();
      const title = page.getByText("Storage is full").element().getBoundingClientRect();

      expect(action.top).toBeGreaterThanOrEqual(content.bottom);
      expect(action.left).toBeCloseTo(title.left, 0);
      // A full-width basis ends at the content's trailing edge.
      expect(content.right - action.right).toBeGreaterThan(16);
    });

    it("keeps the action inline above 768px", async () => {
      await page.viewport(1024, 800);
      await renderToastWithAction();

      const {action, description} = await showToast();

      expect(action.left).toBeGreaterThanOrEqual(description.right);
      expect(action.top).toBeLessThan(description.bottom);
    });
  });
});
