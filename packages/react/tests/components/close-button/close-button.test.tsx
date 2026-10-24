import {fireEvent, render, screen, setupUser} from "@heroui/testing/helpers";
import {Provider} from "react-aria-components";
import {ButtonContext} from "react-aria-components/Button";

import {CloseButton} from "@/components/close-button";

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

describe("CloseButton", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders with default Close accessible name", () => {
    render(<CloseButton />);

    expect(screen.getByRole("button", {name: "Close"})).toBeInTheDocument();
  });

  it("exposes BEM block, data-slot, and default icon slot", () => {
    render(<CloseButton />);
    const button = screen.getByRole("button", {name: "Close"});

    expect(button.className).toEqual(expect.stringContaining("close-button"));
    expect(button).toHaveAttribute("data-slot", "close-button");
    expect(button.querySelector('[data-slot="close-button-icon"]')).not.toBeNull();
  });

  it("supports overriding aria-label", () => {
    render(<CloseButton aria-label="Dismiss dialog" />);

    expect(screen.getByRole("button", {name: "Dismiss dialog"})).toBeInTheDocument();
  });

  it("keeps an aria-label supplied by the button slot", () => {
    render(
      <Provider
        values={[
          [
            ButtonContext,
            {
              slots: {
                close: {"aria-label": "닫기"},
              },
            },
          ],
        ]}
      >
        <CloseButton slot="close" />
      </Provider>,
    );

    expect(screen.getByRole("button", {name: "닫기"})).toBeInTheDocument();
  });

  it("prefers an explicit aria-label over the slot label", () => {
    render(
      <Provider
        values={[
          [
            ButtonContext,
            {
              slots: {
                close: {"aria-label": "닫기"},
              },
            },
          ],
        ]}
      >
        <CloseButton aria-label="Dismiss" slot="close" />
      </Provider>,
    );

    expect(screen.getByRole("button", {name: "Dismiss"})).toBeInTheDocument();
  });

  it("supports data attribute passthrough", () => {
    render(<CloseButton data-testid="close" />);

    expect(screen.getByTestId("close")).toBeInTheDocument();
  });

  it("supports hover state", async () => {
    render(<CloseButton />);
    const button = screen.getByRole("button", {name: "Close"});

    await user.hover(button);
    expect(button).toHaveAttribute("data-hovered", "true");

    await user.unhover(button);
    expect(button).not.toHaveAttribute("data-hovered");
  });

  it("supports press state", () => {
    render(<CloseButton />);
    const button = screen.getByRole("button", {name: "Close"});

    pressDown(button);
    expect(button).toHaveAttribute("data-pressed", "true");

    pressUp(button);
    expect(button).not.toHaveAttribute("data-pressed");
  });

  it("calls onPress on click", async () => {
    const onPress = vi.fn();

    render(<CloseButton onPress={onPress} />);

    await user.click(screen.getByRole("button", {name: "Close"}));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("supports focus-visible via keyboard", async () => {
    render(<CloseButton />);
    const button = screen.getByRole("button", {name: "Close"});

    await user.tab();
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("data-focus-visible", "true");
  });

  it("supports disabled state and blocks press", async () => {
    const onPress = vi.fn();

    render(<CloseButton isDisabled onPress={onPress} />);
    const button = screen.getByRole("button", {name: "Close"});

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-disabled", "true");

    await user.click(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("exposes no hover state when disabled", async () => {
    render(<CloseButton isDisabled />);
    const button = screen.getByRole("button", {name: "Close"});

    await user.hover(button);
    expect(button).not.toHaveAttribute("data-hovered");
  });
});
