import {fireEvent, render, screen, setupUser} from "@heroui/testing/helpers";

import {ToggleButton} from "@/components/toggle-button";

const pointerOpts = {
  button: 0,
  pointerId: 1,
  pointerType: "mouse" as const,
  clientX: 1,
  clientY: 1,
};

// RAC usePress sequence in jsdom.
const pressDown = (element: HTMLElement) => fireEvent.pointerDown(element, pointerOpts);
const pressUp = (element: HTMLElement) => {
  fireEvent.pointerUp(element, pointerOpts);
  fireEvent.click(element, {button: 0});
};

describe("ToggleButton", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders with role and accessible name", () => {
    render(<ToggleButton>Bold</ToggleButton>);

    expect(screen.getByRole("button", {name: "Bold"})).toBeInTheDocument();
  });

  it("exposes BEM block, data-slot, and aria-pressed", () => {
    render(<ToggleButton>Bold</ToggleButton>);
    const button = screen.getByRole("button", {name: "Bold"});

    expect(button.className).toEqual(expect.stringContaining("toggle-button"));
    expect(button).toHaveAttribute("data-slot", "toggle-button");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("supports data attribute passthrough", () => {
    render(<ToggleButton data-testid="toggle">Bold</ToggleButton>);

    expect(screen.getByTestId("toggle")).toBeInTheDocument();
  });

  it("supports toggling selected state on click", async () => {
    const onChange = vi.fn();

    render(<ToggleButton onChange={onChange}>Bold</ToggleButton>);
    const button = screen.getByRole("button", {name: "Bold"});

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAttribute("data-selected", "true");
    expect(onChange).toHaveBeenCalledWith(true);

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("supports uncontrolled defaultSelected", () => {
    render(<ToggleButton defaultSelected>Bold</ToggleButton>);

    expect(screen.getByRole("button", {name: "Bold"})).toHaveAttribute("aria-pressed", "true");
  });

  it("supports controlled isSelected", async () => {
    const onChange = vi.fn();

    const {rerender} = render(
      <ToggleButton isSelected={false} onChange={onChange}>
        Bold
      </ToggleButton>,
    );
    const button = screen.getByRole("button", {name: "Bold"});

    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);
    expect(onChange).toHaveBeenCalledWith(true);

    rerender(
      <ToggleButton isSelected onChange={onChange}>
        Bold
      </ToggleButton>,
    );
    expect(screen.getByRole("button", {name: "Bold"})).toHaveAttribute("aria-pressed", "true");
  });

  it("supports hover state", async () => {
    render(<ToggleButton>Bold</ToggleButton>);
    const button = screen.getByRole("button", {name: "Bold"});

    await user.hover(button);
    expect(button).toHaveAttribute("data-hovered", "true");

    await user.unhover(button);
    expect(button).not.toHaveAttribute("data-hovered");
  });

  it("supports press state", () => {
    render(<ToggleButton>Bold</ToggleButton>);
    const button = screen.getByRole("button", {name: "Bold"});

    pressDown(button);
    expect(button).toHaveAttribute("data-pressed", "true");

    pressUp(button);
    expect(button).not.toHaveAttribute("data-pressed");
  });

  it("supports focus-visible via keyboard", async () => {
    render(<ToggleButton>Bold</ToggleButton>);
    const button = screen.getByRole("button", {name: "Bold"});

    await user.tab();
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("data-focus-visible", "true");
  });

  it("supports keyboard activation with Enter and Space", async () => {
    const onChange = vi.fn();

    render(<ToggleButton onChange={onChange}>Bold</ToggleButton>);
    const button = screen.getByRole("button", {name: "Bold"});

    await user.tab();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(onChange).toHaveBeenCalledWith(true);

    await user.keyboard(" ");
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("supports disabled state and blocks toggle", async () => {
    const onChange = vi.fn();

    render(
      <ToggleButton isDisabled onChange={onChange}>
        Bold
      </ToggleButton>,
    );
    const button = screen.getByRole("button", {name: "Bold"});

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-disabled", "true");

    await user.click(button);
    expect(onChange).not.toHaveBeenCalled();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("exposes no hover state when disabled", async () => {
    render(<ToggleButton isDisabled>Bold</ToggleButton>);
    const button = screen.getByRole("button", {name: "Bold"});

    await user.hover(button);
    expect(button).not.toHaveAttribute("data-hovered");
  });

  it("supports children as a render function receiving selection state", async () => {
    render(<ToggleButton>{({isSelected}) => (isSelected ? "Bold on" : "Bold off")}</ToggleButton>);

    const button = screen.getByRole("button", {name: "Bold off"});

    await user.click(button);

    expect(screen.getByRole("button", {name: "Bold on"})).toBeInTheDocument();
  });
});
