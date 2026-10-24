import {render, screen} from "@heroui/testing/helpers";
import {createRef} from "react";
import {SeparatorContext} from "react-aria-components/Separator";

import {Separator} from "@/components/separator";

describe("Separator", () => {
  it("renders with separator role", () => {
    render(<Separator />);

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");

    expect(separator).toHaveAttribute("data-slot", "separator");
    expect(separator.className).toEqual(expect.stringContaining("separator"));
  });

  it("exposes orientation BEM modifier and data attribute", () => {
    render(<Separator data-testid="separator" orientation="vertical" />);
    const separator = screen.getByTestId("separator");

    expect(separator).toHaveAttribute("data-orientation", "vertical");
    expect(separator.className).toEqual(expect.stringContaining("separator--vertical"));
  });

  it("exposes variant BEM modifier", () => {
    render(<Separator data-testid="separator" variant="secondary" />);

    expect(screen.getByTestId("separator").className).toEqual(
      expect.stringContaining("separator--secondary"),
    );
  });

  it("supports data attribute passthrough", () => {
    render(<Separator data-foo="bar" data-testid="separator" />);

    expect(screen.getByTestId("separator")).toHaveAttribute("data-foo", "bar");
  });

  it.each(["horizontal", "vertical"] as const)(
    "renders a decorative %s divider without separator semantics",
    (orientation) => {
      render(<Separator isDecorative data-testid="divider" orientation={orientation} />);
      const divider = screen.getByTestId("divider");

      expect(divider.tagName).toBe("DIV");
      expect(divider).toHaveAttribute("aria-hidden", "true");
      expect(divider).not.toHaveAttribute("aria-orientation");
      expect(screen.queryByRole("separator", {hidden: true})).toBeNull();
      expect(divider).toHaveAttribute("data-slot", "separator");
      expect(divider).toHaveAttribute("data-orientation", orientation);
      expect(divider.className).toEqual(expect.stringContaining(`separator--${orientation}`));
      expect(divider).not.toHaveAttribute("isDecorative");
    },
  );

  it("supports an explicit element type for decorative dividers", () => {
    render(<Separator isDecorative data-testid="divider" elementType="hr" />);

    expect(screen.getByTestId("divider").tagName).toBe("HR");
    expect(screen.getByTestId("divider")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("separator", {hidden: true})).toBeNull();
  });

  it.each([false, true])(
    "supports custom renders and refs with isDecorative=%s",
    (isDecorative) => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Separator
          ref={ref}
          className="custom-divider"
          isDecorative={isDecorative}
          orientation="vertical"
          render={(props) => <div {...props} data-testid="custom-divider" />}
          variant="secondary"
        />,
      );
      const divider = screen.getByTestId("custom-divider");

      expect(ref.current).toBe(divider);
      expect(divider).toHaveClass("custom-divider", "separator--secondary");
      if (isDecorative) {
        expect(divider).toHaveAttribute("aria-hidden", "true");
        expect(divider).not.toHaveAttribute("aria-orientation");
        expect(screen.queryByRole("separator", {hidden: true})).toBeNull();
      } else {
        expect(screen.getByRole("separator")).toBe(divider);
        expect(divider).toHaveAttribute("aria-orientation", "vertical");
        expect(divider).not.toHaveAttribute("aria-hidden");
      }
    },
  );

  it("supports switching between decorative and semantic dividers", () => {
    const {rerender} = render(<Separator isDecorative data-testid="divider" />);

    rerender(<Separator data-testid="divider" />);

    expect(screen.getByRole("separator")).toBe(screen.getByTestId("divider"));
    expect(screen.getByTestId("divider")).not.toHaveAttribute("aria-hidden");
  });

  it.each([false, true])("supports a context renderer with isDecorative=%s", (isDecorative) => {
    const ref = createRef<HTMLDivElement>();

    render(
      <SeparatorContext
        value={{ref, render: (props) => <div {...props} data-testid="context-divider" />}}
      >
        <Separator isDecorative={isDecorative} />
      </SeparatorContext>,
    );

    const divider = screen.getByTestId("context-divider");

    expect(ref.current).toBe(divider);
    if (isDecorative) {
      expect(divider).toHaveAttribute("aria-hidden", "true");
      expect(screen.queryByRole("separator", {hidden: true})).toBeNull();
    } else {
      expect(screen.getByRole("separator")).toBe(divider);
    }
  });

  it.each(["horizontal", "vertical"] as const)(
    "supports a context element type with %s orientation",
    (orientation) => {
      render(
        <SeparatorContext value={{elementType: "hr", orientation}}>
          <Separator isDecorative data-testid="divider" />
        </SeparatorContext>,
      );

      expect(screen.getByTestId("divider").tagName).toBe(orientation === "vertical" ? "DIV" : "HR");
      expect(screen.getByTestId("divider")).toHaveAttribute("data-orientation", orientation);
      expect(screen.queryByRole("separator", {hidden: true})).toBeNull();
    },
  );

  it("supports slotted context renderers and explicit overrides", () => {
    const context = {
      slots: {
        divider: {
          orientation: "vertical" as const,
          render: (props: React.ComponentPropsWithRef<"div">) => (
            <div {...props} data-testid="context-divider" />
          ),
        },
      },
    };
    const {rerender} = render(
      <SeparatorContext value={context}>
        <Separator isDecorative slot="divider" />
      </SeparatorContext>,
    );

    expect(screen.getByTestId("context-divider")).toHaveAttribute("data-orientation", "vertical");
    expect(screen.getByTestId("context-divider")).toHaveAttribute("aria-hidden", "true");

    rerender(
      <SeparatorContext value={context}>
        <Separator
          isDecorative
          orientation="horizontal"
          render={(props) => <div {...props} data-testid="explicit-divider" />}
          slot="divider"
        />
      </SeparatorContext>,
    );

    expect(screen.queryByTestId("context-divider")).toBeNull();
    expect(screen.getByTestId("explicit-divider")).toHaveAttribute(
      "data-orientation",
      "horizontal",
    );
    expect(screen.getByTestId("explicit-divider")).toHaveAttribute("aria-hidden", "true");
  });
});
