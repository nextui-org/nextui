import * as React from "react";
import {act, render} from "@testing-library/react";
import {focus} from "@nextui-org/test-utils";
import userEvent from "@testing-library/user-event";

import {Accordion, AccordionItem} from "../src";

describe("Accordion", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem>Accordion Item</AccordionItem>
      </Accordion>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Accordion ref={ref}>
        <AccordionItem>Accordion Item</AccordionItem>
      </Accordion>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should display the correct number of items", () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem key="1">Accordion Item</AccordionItem>
        <AccordionItem key="2">Accordion Item</AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getAllByRole("button")).toHaveLength(2);
  });

  it("should be opened when defaultExpandedKeys is set", () => {
    const wrapper = render(
      <Accordion defaultExpandedKeys={["1"]}>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getByTestId("item-1")).toHaveAttribute("data-open", "true");
  });

  it("should be disabled when disabledKeys is set", () => {
    const wrapper = render(
      <Accordion disabledKeys={["1"]}>
        <AccordionItem key="1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getAllByRole("button")[0]).toBeDisabled();
  });

  it("should expand the accordion item when clicked", () => {
    const wrapper = render(
      <Accordion disableAnimation>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const base = wrapper.getByTestId("item-1");
    const button = base.querySelector("button");

    expect(button).toHaveAttribute("aria-expanded", "false");

    act(() => {
      button?.click();
    });

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("should support leftIndicator", () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem
          key="1"
          data-testid="item-1"
          leftIndicator={<div data-testid="left-content" />}
          title="Accordion Item 1"
        >
          Accordion Item 1 description
        </AccordionItem>
      </Accordion>,
    );

    expect(wrapper.getByTestId("left-content")).toBeInTheDocument();
  });

  it("arrow up & down moves focus to next/previous accordion item", async () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const first = wrapper.getByTestId("item-1");
    const firstButton = first.querySelector("button") as HTMLElement;

    const second = wrapper.getByTestId("item-2");
    const secondButton = second.querySelector("button") as HTMLElement;

    act(() => {
      focus(firstButton);
    });

    await act(async () => {
      await userEvent.keyboard("[ArrowDown]");
    });
    expect(secondButton).toHaveFocus();

    await act(async () => {
      await userEvent.keyboard("[ArrowUp]");
    });
    expect(firstButton).toHaveFocus();
  });

  it("home & end keys moves focus to first/last accordion", async () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const first = wrapper.getByTestId("item-1");
    const firstButton = first.querySelector("button") as HTMLElement;

    const second = wrapper.getByTestId("item-2");
    const secondButton = second.querySelector("button") as HTMLElement;

    act(() => {
      focus(secondButton);
    });

    await act(async () => {
      await userEvent.keyboard("[Home]");
    });
    expect(firstButton).toHaveFocus();

    await act(async () => {
      await userEvent.keyboard("[End]");
    });
    expect(secondButton).toHaveFocus();
  });

  it("tab moves focus to the next focusable element", async () => {
    const wrapper = render(
      <Accordion>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const first = wrapper.getByTestId("item-1");
    const firstButton = first.querySelector("button") as HTMLElement;

    const second = wrapper.getByTestId("item-2");
    const secondButton = second.querySelector("button") as HTMLElement;

    act(() => {
      focus(firstButton);
    });

    await act(async () => {
      await userEvent.keyboard("[Tab]");
    });
    expect(secondButton).toHaveFocus();
  });

  it("aria-controls for button is same as id for region", async () => {
    const wrapper = render(
      <Accordion defaultExpandedKeys={["1"]}>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
        <AccordionItem key="2" data-testid="item-2" title="Accordion Item 2">
          Accordion Item 2 description
        </AccordionItem>
      </Accordion>,
    );

    const base = wrapper.getByTestId("item-1");
    const button = base.querySelector("button") as HTMLElement;

    const region = base.querySelector("[role='region']") as HTMLElement;

    expect(button).toHaveAttribute("aria-controls", region.id);
  });

  it("aria-expanded is true/false when accordion is open/closed", async () => {
    const wrapper = render(
      <Accordion disableAnimation>
        <AccordionItem key="1" data-testid="item-1" title="Accordion Item 1">
          Accordion Item 1 description
        </AccordionItem>
      </Accordion>,
    );

    const base = wrapper.getByTestId("item-1");
    const button = base.querySelector("button") as HTMLElement;

    expect(button).toHaveAttribute("aria-expanded", "false");

    act(() => {
      button?.click();
    });

    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});
