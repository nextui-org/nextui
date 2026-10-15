import {render} from "@heroui/testing/browser";
import {useFilter} from "react-aria-components/Autocomplete";
import {page, userEvent} from "vitest/browser";

import {Autocomplete} from "@/components/autocomplete";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";
import {SearchField} from "@/components/search-field";

import {animatedProperties, stretchAnimation} from "../../helpers/overlay-motion";

import {AutocompleteMultipleFixture} from "./fixtures";

// Tag remove hit-targets and focus rings live in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

/** Offset from the glyph centre that a finger routinely lands on, inside the 24px target. */
const OFF_CENTRE = 11;

/** How far the option's content box runs under its indicator, which is absolutely positioned
 * and therefore only kept off the label by the item's inline-end padding. */
const indicatorOverlapOf = (name: string) => {
  const option = page.getByRole("option", {name}).element();
  const indicator = option.querySelector('[data-slot="list-box-item-indicator"]')!;
  const contentEnd =
    option.getBoundingClientRect().right - parseFloat(getComputedStyle(option).paddingInlineEnd);

  return contentEnd - indicator.getBoundingClientRect().left;
};

const animals = [
  {id: "cat", name: "Cat"},
  {id: "dog", name: "Dog"},
];

const AutocompleteOpenFixture = ({scrollable = false}: {scrollable?: boolean}) => {
  const items = scrollable
    ? Array.from({length: 40}, (_, index) => ({id: `option-${index}`, name: `Animal ${index}`}))
    : animals;
  const {contains} = useFilter({sensitivity: "base"});

  return (
    <Autocomplete data-testid="autocomplete" placeholder="Select an animal" selectionMode="single">
      <Label>Favorite Animal</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <SearchField autoFocus aria-label="Search animals" name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search animals..." />
            </SearchField.Group>
          </SearchField>
          <ListBox className={scrollable ? "max-h-24" : undefined}>
            {items.map((item) => (
              <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                {item.name}
              </ListBox.Item>
            ))}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
};

describe("Autocomplete (browser)", () => {
  describe("overlay motion", () => {
    it("opens with an opacity and transform only animation", async () => {
      stretchAnimation('.autocomplete__popover[data-entering="true"]');
      await render(<AutocompleteOpenFixture />);
      await page.getByTestId("autocomplete").getByText("Select an animal").click();
      await expect.element(page.getByRole("listbox")).toBeInTheDocument();

      const popover = document.querySelector<HTMLElement>(".autocomplete__popover")!;
      const {animation, properties} = animatedProperties(popover);

      expect(animation?.animationName).toMatch(/^heroui-overlay-enter-95/);
      expect(properties).toEqual(["opacity", "transform"]);
    });

    it("closes with an opacity and transform animation", async () => {
      stretchAnimation('.autocomplete__popover[data-exiting="true"]');
      await render(<AutocompleteOpenFixture />);
      await page.getByTestId("autocomplete").getByText("Select an animal").click();
      await expect.element(page.getByRole("listbox")).toBeInTheDocument();

      const openPopover = document.querySelector<HTMLElement>(".autocomplete__popover")!;

      await expect.poll(() => openPopover.getAnimations().length).toBe(0);
      await userEvent.keyboard("{Escape}");

      const popover = document.querySelector<HTMLElement>(".autocomplete__popover")!;

      expect(popover).toHaveAttribute("data-exiting", "true");

      const {animation, properties} = animatedProperties(popover);

      expect(animation?.animationName).toBe("heroui-overlay-exit");
      expect(getComputedStyle(popover).animationFillMode).toBe("none");
      expect(properties).toEqual(["opacity", "transform"]);
    });
  });

  describe("multiple selection with tags", () => {
    it("removes the tag on the first press landing off the glyph", async () => {
      const screen = await render(<AutocompleteMultipleFixture />);

      const removeButton = page.getByRole("button", {name: "Remove tag Dog"});
      const {height, width} = removeButton.element().getBoundingClientRect();

      // `position` is relative to the element's top-left corner, so this aims `OFF_CENTRE` px to
      // the left of the glyph. A press that far off used to land on the tag body, which consumes
      // it and removes nothing — the reason removing a tag by touch took several attempts.
      await removeButton.click({position: {x: width / 2 - OFF_CENTRE, y: height / 2}});

      await expect.element(screen.getByRole("row", {name: "Dog"})).not.toBeInTheDocument();
      await expect.element(screen.getByRole("row", {name: "Cat"})).toBeInTheDocument();
      await expect.element(screen.getByRole("row", {name: "Panda"})).toBeInTheDocument();

      // A press inside the trigger must not open the dropdown, otherwise the next press is
      // swallowed dismissing the popover instead of removing a tag.
      await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("item indicator", () => {
    it("reserves room for the indicator so it never sits on the label", async () => {
      await render(<AutocompleteMultipleFixture defaultOpen />);

      await expect.element(page.getByRole("listbox")).toBeInTheDocument();

      expect(indicatorOverlapOf("Dog")).toBeLessThanOrEqual(0);
    });
  });
  it("supports keyboard scrolling and selection while keeping virtual focus on the input", async () => {
    await render(<AutocompleteOpenFixture scrollable />);
    await page.getByTestId("autocomplete").getByText("Select an animal").click();
    const input = page.getByRole("searchbox");
    const listbox = page.getByRole("listbox");

    await expect.element(input).toHaveFocus();
    await expect.element(listbox).not.toHaveAttribute("tabindex");
    for (let index = 0; index < 15; index++) {
      await userEvent.keyboard("{ArrowDown}");
    }
    await expect.element(input).toHaveFocus();
    await expect.poll(() => listbox.element().scrollTop).toBeGreaterThan(0);
    await expect.poll(() => input.element().getAttribute("aria-activedescendant")).toBeTruthy();
    const activeId = input.element().getAttribute("aria-activedescendant")!;

    expect(document.getElementById(activeId)).toHaveAttribute("role", "option");
    await userEvent.keyboard("{Enter}");
    await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
  });
});
