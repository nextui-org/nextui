import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";
import {SearchField} from "@/components/search-field";

describe("SearchField", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  const renderSearch = (props: ComponentProps<typeof SearchField> = {}) =>
    render(
      <SearchField name="search" {...props}>
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>,
    );

  it("renders search role with accessible name", () => {
    renderSearch();

    expect(screen.getByRole("searchbox", {name: "Search"})).toBeInTheDocument();
  });

  it("exposes compound data-slots and BEM block", () => {
    renderSearch();

    expect(document.querySelector('[data-slot="search-field"]')?.className).toEqual(
      expect.stringContaining("search-field"),
    );
    expect(document.querySelector('[data-slot="search-field-group"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="search-field-input"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="search-field-search-icon"]')).not.toBeNull();
  });

  it("exposes variant BEM modifier", () => {
    renderSearch({variant: "secondary"});

    expect(document.querySelector('[data-slot="search-field"]')?.className).toEqual(
      expect.stringContaining("search-field--secondary"),
    );
  });

  it("supports typing and calls onChange", async () => {
    const onChange = vi.fn();

    renderSearch({onChange});
    const input = screen.getByRole("searchbox", {name: "Search"});

    await user.type(input, "hero");
    expect(input).toHaveValue("hero");
    expect(onChange.mock.calls.at(-1)?.[0]).toBe("hero");
  });

  it("supports clearing via the clear button when non-empty", async () => {
    const onChange = vi.fn();

    renderSearch({defaultValue: "hero", onChange});

    const clear = document.querySelector(
      '[data-slot="search-field-clear-button"]',
    ) as HTMLElement | null;

    expect(clear).not.toBeNull();
    expect(clear).toHaveAccessibleName("Clear search");

    await user.click(clear!);
    expect(screen.getByRole("searchbox", {name: "Search"})).toHaveValue("");
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("exposes empty state when value is cleared", async () => {
    renderSearch({defaultValue: "hero"});

    const field = document.querySelector('[data-slot="search-field"]');
    const clear = document.querySelector('[data-slot="search-field-clear-button"]') as HTMLElement;

    expect(field).not.toHaveAttribute("data-empty");

    await user.click(clear);
    expect(field).toHaveAttribute("data-empty", "true");
  });

  it("supports disabled state", async () => {
    const onChange = vi.fn();

    renderSearch({isDisabled: true, onChange});
    const input = screen.getByRole("searchbox", {name: "Search"});

    expect(input).toBeDisabled();
    expect(document.querySelector('[data-slot="search-field"]')).toHaveAttribute(
      "data-disabled",
      "true",
    );

    await user.type(input, "x");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders FieldError when invalid", () => {
    render(
      <SearchField isInvalid isRequired name="search" value="ab">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input />
          <SearchField.ClearButton />
        </SearchField.Group>
        <FieldError>Enter at least 3 characters</FieldError>
      </SearchField>,
    );

    expect(screen.getByText("Enter at least 3 characters")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="search-field"]')).toHaveAttribute(
      "data-invalid",
      "true",
    );
  });

  it("supports focus-visible via keyboard", async () => {
    renderSearch();
    const input = screen.getByRole("searchbox", {name: "Search"});

    await user.tab();
    expect(input).toHaveFocus();

    const focusTarget =
      input.closest("[data-focus-visible='true']") ??
      document.querySelector("[data-focus-visible='true']");

    expect(focusTarget).not.toBeNull();
  });
});
