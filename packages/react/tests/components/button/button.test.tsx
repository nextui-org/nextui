import {fireEvent, render, screen, setupUser} from "@heroui/testing/helpers";

import {Button} from "@/components/button";

const pointerOpts = {
  button: 0,
  pointerId: 1,
  pointerType: "mouse",
  clientX: 1,
  clientY: 1,
} as const;

// RAC usePress sequence in jsdom.
const pressDown = (element: HTMLElement) => fireEvent.pointerDown(element, pointerOpts);
const pressUp = (element: HTMLElement) => {
  fireEvent.pointerUp(element, pointerOpts);
  fireEvent.click(element, {button: 0});
};

describe("Button", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders with role and accessible name", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    expect(button.className).toEqual(expect.stringContaining("button"));
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("exposes variant BEM modifier", () => {
    render(<Button variant="secondary">Save</Button>);

    expect(screen.getByRole("button", {name: "Save"}).className).toEqual(
      expect.stringContaining("button--secondary"),
    );
  });

  it("merges a string className onto variant classes", () => {
    render(
      <Button className="custom-action" variant="secondary">
        Save
      </Button>,
    );
    const button = screen.getByRole("button", {name: "Save"});

    expect(button.className).toEqual(expect.stringContaining("button"));
    expect(button.className).toEqual(expect.stringContaining("button--secondary"));
    expect(button.className).toEqual(expect.stringContaining("custom-action"));
  });

  it("supports data attribute passthrough", () => {
    render(<Button data-testid="save-btn">Save</Button>);

    expect(screen.getByTestId("save-btn")).toBeInTheDocument();
  });

  it("supports hover state", async () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    expect(button).not.toHaveAttribute("data-hovered");

    await user.hover(button);
    expect(button).toHaveAttribute("data-hovered", "true");

    await user.unhover(button);
    expect(button).not.toHaveAttribute("data-hovered");
  });

  it("supports press state", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    expect(button).not.toHaveAttribute("data-pressed");

    pressDown(button);
    expect(button).toHaveAttribute("data-pressed", "true");

    pressUp(button);
    expect(button).not.toHaveAttribute("data-pressed");
  });

  it("calls onPress on click", async () => {
    const onPress = vi.fn();

    render(<Button onPress={onPress}>Save</Button>);

    await user.click(screen.getByRole("button", {name: "Save"}));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("supports focus-visible via keyboard", async () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    expect(button).not.toHaveAttribute("data-focus-visible");

    await user.tab();
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("data-focus-visible", "true");

    await user.tab();
    expect(button).not.toHaveAttribute("data-focus-visible");
  });

  it("supports disabled state and blocks press", async () => {
    const onPress = vi.fn();

    render(
      <Button isDisabled onPress={onPress}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", {name: "Save"});

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-disabled", "true");

    await user.click(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("exposes no hover state when disabled", async () => {
    render(<Button isDisabled>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    await user.hover(button);
    expect(button).not.toHaveAttribute("data-hovered");
  });

  it("supports keyboard activation with Enter and Space", async () => {
    const onPress = vi.fn();

    render(<Button onPress={onPress}>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    await user.tab();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(onPress).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(onPress).toHaveBeenCalledTimes(2);
  });

  it("supports render-prop children for press state", () => {
    render(<Button>{({isPressed}) => (isPressed ? "Pressed" : "Save")}</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    pressDown(button);
    expect(button).toHaveTextContent("Pressed");

    pressUp(button);
    expect(button).toHaveTextContent("Save");
  });
});
