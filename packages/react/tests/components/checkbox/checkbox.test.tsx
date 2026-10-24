import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Checkbox} from "@/components/checkbox";
import {Label} from "@/components/label";

describe("Checkbox", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  const checkbox = (props: ComponentProps<typeof Checkbox> = {}) => (
    <Checkbox {...props}>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>Accept terms</Label>
      </Checkbox.Content>
    </Checkbox>
  );

  const renderCheckbox = (props: ComponentProps<typeof Checkbox> = {}) => render(checkbox(props));

  it("renders with role and accessible name", () => {
    renderCheckbox();

    expect(screen.getByRole("checkbox", {name: "Accept terms"})).toBeInTheDocument();
  });

  it("exposes BEM block and composed data-slots", () => {
    renderCheckbox();

    const field = document.querySelector('[data-slot="checkbox"]');

    expect(field?.className).toEqual(expect.stringContaining("checkbox"));
    expect(document.querySelector('[data-slot="checkbox-content"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="checkbox-control"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="checkbox-indicator"]')).not.toBeNull();
  });

  it("renders a nested Label as a span so the content label has no descendant label", () => {
    renderCheckbox();

    const label = screen.getByText("Accept terms");
    const content = document.querySelector('[data-slot="checkbox-content"]');

    expect(label.tagName).toBe("SPAN");
    expect(content?.tagName).toBe("LABEL");
    expect(content?.querySelector("label")).toBeNull();
  });

  it("supports data attribute passthrough on the field", () => {
    render(
      <Checkbox data-testid="terms">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Accept terms
        </Checkbox.Content>
      </Checkbox>,
    );

    expect(screen.getByTestId("terms")).toHaveAttribute("data-slot", "checkbox");
  });

  it("calls onChange when selection is toggled", async () => {
    const onChange = vi.fn();

    renderCheckbox({onChange});
    const checkbox = screen.getByRole("checkbox", {name: "Accept terms"});

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("supports controlled isSelected", async () => {
    const onChange = vi.fn();

    const {rerender} = render(
      <Checkbox isSelected={false} onChange={onChange}>
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Accept terms</Label>
        </Checkbox.Content>
      </Checkbox>,
    );
    const checkbox = screen.getByRole("checkbox", {name: "Accept terms"});

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);

    rerender(
      <Checkbox isSelected onChange={onChange}>
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Accept terms</Label>
        </Checkbox.Content>
      </Checkbox>,
    );
    expect(screen.getByRole("checkbox", {name: "Accept terms"})).toBeChecked();
  });

  it("exposes data-selected when selected", async () => {
    renderCheckbox();
    const checkbox = screen.getByRole("checkbox", {name: "Accept terms"});
    const field = checkbox.closest("[data-slot='checkbox']");

    await user.click(checkbox);
    expect(field).toHaveAttribute("data-selected", "true");
  });

  it("supports indeterminate state", () => {
    renderCheckbox({isIndeterminate: true});
    const checkbox = screen.getByRole("checkbox", {name: "Accept terms"});
    const field = checkbox.closest("[data-slot='checkbox']");

    expect(checkbox).toHaveProperty("indeterminate", true);
    expect(field).toHaveAttribute("data-indeterminate", "true");
  });

  it("preserves the checkmark draw animation across indeterminate transitions", () => {
    const {rerender} = renderCheckbox({isIndeterminate: true});
    const checkmark = document.querySelector('[data-slot="checkbox-default-indicator--checkmark"]');

    expect(checkmark).toHaveAttribute("stroke-dashoffset", "66");
    expect(
      document.querySelector('[data-slot="checkbox-default-indicator--indeterminate"]'),
    ).not.toBeNull();

    rerender(checkbox());
    expect(document.querySelector('[data-slot="checkbox-default-indicator--checkmark"]')).toBe(
      checkmark,
    );
    expect(checkmark).toHaveAttribute("stroke-dashoffset", "66");
    expect(
      document.querySelector('[data-slot="checkbox-default-indicator--indeterminate"]'),
    ).toBeNull();

    rerender(checkbox({isIndeterminate: true}));
    rerender(checkbox({isSelected: true}));
    expect(document.querySelector('[data-slot="checkbox-default-indicator--checkmark"]')).toBe(
      checkmark,
    );
    expect(checkmark).toHaveAttribute("stroke-dashoffset", "44");
    expect(
      document.querySelector('[data-slot="checkbox-default-indicator--indeterminate"]'),
    ).toBeNull();
  });

  it("supports Space key toggle", async () => {
    const onChange = vi.fn();

    renderCheckbox({onChange});
    const checkbox = screen.getByRole("checkbox", {name: "Accept terms"});

    await user.tab();
    expect(checkbox).toHaveFocus();

    await user.keyboard(" ");
    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("supports disabled state and blocks interaction", async () => {
    const onChange = vi.fn();

    renderCheckbox({isDisabled: true, onChange});
    const checkbox = screen.getByRole("checkbox", {name: "Accept terms"});
    const field = checkbox.closest("[data-slot='checkbox']");

    expect(checkbox).toBeDisabled();
    expect(field).toHaveAttribute("data-disabled", "true");

    await user.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });

  it("supports focus-visible via keyboard", async () => {
    renderCheckbox();
    const checkbox = screen.getByRole("checkbox", {name: "Accept terms"});
    const content = checkbox.closest("[data-slot='checkbox-content']");

    await user.tab();
    expect(checkbox).toHaveFocus();
    expect(content).toHaveAttribute("data-focus-visible", "true");
  });
});
