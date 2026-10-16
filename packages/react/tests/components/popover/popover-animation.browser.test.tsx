import {render} from "@heroui/testing/browser";
import {createRef} from "react";
import {PopoverContext} from "react-aria-components/Popover";
import {page} from "vitest/browser";

import {Button} from "@/components/button";
import {Dropdown} from "@/components/dropdown";
import {Popover} from "@/components/popover";

import {stretchAnimation} from "../../helpers/overlay-motion";

import "@/styles.css";

describe("Popover (browser)", () => {
  it.each(["prop", "context", "override"] as const)(
    "supports the %s animation preference when closing",
    async (source) => {
      stretchAnimation('.popover[data-exiting="true"]');
      const triggerRef = createRef<HTMLButtonElement>();
      const fixture = (isOpen: boolean) => (
        <Popover isOpen={isOpen}>
          <Button ref={triggerRef}>Open popover</Button>
          <PopoverContext value={{slots: {motion: {shouldSkipAnimation: true}}}}>
            <Popover.Content
              slot={source === "prop" ? null : "motion"}
              triggerRef={triggerRef}
              shouldSkipAnimation={
                source === "prop" ? true : source === "override" ? false : undefined
              }
            >
              <Popover.Dialog aria-label="Animation preference">Content</Popover.Dialog>
            </Popover.Content>
          </PopoverContext>
        </Popover>
      );
      const view = await render(fixture(true));
      const dialog = page.getByRole("dialog", {name: "Animation preference"});

      await expect.element(dialog).toBeInTheDocument();
      await expect.poll(() => document.querySelector(".popover")?.getAnimations().length).toBe(0);
      await view.rerender(fixture(false));

      if (source === "override") {
        expect(dialog.element()).toBeInTheDocument();
        expect(document.querySelector(".popover")).toHaveAttribute("data-exiting", "true");
      } else {
        // Synchronous assertion: waiting for disappearance would also pass after an unwanted exit.
        expect(document.querySelector('[role="dialog"]')).toBeNull();
      }
    },
  );

  it("supports skipping a dropdown close animation", async () => {
    stretchAnimation('.dropdown__popover[data-exiting="true"]');
    const fixture = (isOpen: boolean) => (
      <Dropdown isOpen={isOpen}>
        <Dropdown.Trigger>Actions</Dropdown.Trigger>
        <Dropdown.Popover shouldSkipAnimation>
          <Dropdown.Menu aria-label="Actions">
            <Dropdown.Item id="edit">Edit</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    );
    const view = await render(fixture(true));

    await expect.element(page.getByRole("menu", {name: "Actions"})).toBeInTheDocument();
    await view.rerender(fixture(false));
    expect(document.querySelector('[role="menu"]')).toBeNull();
  });
});
