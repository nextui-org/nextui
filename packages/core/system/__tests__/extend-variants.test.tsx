import React from "react";
import {render, screen} from "@testing-library/react";

import {extendVariants, ExtendVariantProps} from "../src/extend-variants";
import {Button} from "../test-utils/extend-components";

const createExtendComponent = (styles: ExtendVariantProps = {}) =>
  extendVariants(Button, {
    variants: {
      isScalable: {
        true: "scale-125",
        false: "",
      },
      size: {
        xl: "size--xl",
        "2xl": "size--2xl",
      },
      mySize: {
        lg: "px-12 py-6 text-lg",
        xl: "px-12 py-6 text-xl",
      },
      ...styles?.variants,
    },
    defaultVariants: {
      size: "xl",
      ...styles?.defaultVariants,
    },
    compoundVariants: styles.compoundVariants ?? [
      {
        isScalable: true,
        size: "2xl",
        class: "scale-150",
      },
    ],
  });

describe("extendVariants function - no slots", () => {
  it("should render correctly", () => {
    const Button2 = createExtendComponent();
    const wrapper = render(<Button2 />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLButtonElement>();
    const Button2 = createExtendComponent();

    render(<Button2 ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  test("should render with given text", () => {
    const Button2 = createExtendComponent();

    render(<Button2>Press me</Button2>);

    expect(screen.getByText("Press me")).toBeInTheDocument();
  });

  test("should override the base styles", () => {
    const Button2 = createExtendComponent();
    const {container} = render(
      <Button2 className="px-3 py-2 rounded-medium hover:opacity-80">Press me</Button2>,
    );

    const button = container.querySelector("button");

    expect(button).toHaveClass("px-3 py-2 rounded-medium hover:opacity-80");
  });

  test("should have the default variant styles - extended", () => {
    const Button2 = createExtendComponent();
    const {container} = render(<Button2>Press me</Button2>);

    const button = container.querySelector("button");

    expect(button).toHaveClass("size--xl");
  });

  test("should have the default variant styles - original", () => {
    const Button2 = createExtendComponent({
      defaultVariants: {
        size: "sm",
      },
    });

    const {container} = render(<Button2>Press me</Button2>);

    const button = container.querySelector("button");

    expect(button).toHaveClass(
      "px-unit-3 min-w-unit-16 h-unit-8 text-tiny gap-unit-2 rounded-small",
    );
  });

  test("should include the compound variant styles - extended", () => {
    const Button2 = createExtendComponent();
    const {container} = render(
      <Button2 isScalable size="2xl">
        Press me
      </Button2>,
    );

    const button = container.querySelector("button");

    expect(button).toHaveClass("scale-150");
  });

  test("should include the compound variant styles - original", () => {
    const Button2 = createExtendComponent({
      compoundVariants: [
        {
          isScalable: true,
          size: "lg",
          class: "scale-150",
        },
      ],
    });

    const {container} = render(
      <Button2 isScalable size="lg">
        Press me
      </Button2>,
    );

    const button = container.querySelector("button");

    expect(button).toHaveClass("scale-150");
  });
});
