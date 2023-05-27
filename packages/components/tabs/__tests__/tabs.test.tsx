import * as React from "react";
import {act, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {focus} from "@nextui-org/test-utils";

import {Tabs, Tab} from "../src";

type Item = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

let tabs: Item[] = [
  {
    id: "item1",
    label: "Item1 ",
    content: "Content 1",
  },
  {
    id: "item2",
    label: "Item 2",
    content: "Content 2",
  },
  {
    id: "item3",
    label: "Item 3",
    content: "Content 3",
  },
];

describe("Tabs", () => {
  it("should render correctly (static)", () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test">
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly (dynamic)", () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <div>{item.content}</div>
          </Tab>
        )}
      </Tabs>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Tabs ref={ref} aria-label="Tabs static test">
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );
    expect(ref.current).not.toBeNull();
  });

  test("should select the correct tab with keyboard navigation", async () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test">
        <Tab key="item1" data-testid="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" data-testid="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" data-testid="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    const tab1 = wrapper.getByTestId("item1");
    const tab2 = wrapper.getByTestId("item2");
    const tab3 = wrapper.getByTestId("item3");

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");

    act(() => {
      focus(tab1);
    });

    await act(async () => {
      await userEvent.keyboard("[ArrowRight]");
    });

    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab3).toHaveAttribute("aria-selected", "false");

    await act(async () => {
      await userEvent.keyboard("[ArrowRight]");
    });

    expect(tab1).toHaveAttribute("aria-selected", "false");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "true");

    await act(async () => {
      await userEvent.keyboard("[ArrowRight]");
    });

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");
  });

  test("should focus the correct tab with manual keyboard navigation", async () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test" keyboardActivation="manual">
        <Tab key="item1" data-testid="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" data-testid="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" data-testid="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    const tab1 = wrapper.getByTestId("item1");
    const tab2 = wrapper.getByTestId("item2");
    const tab3 = wrapper.getByTestId("item3");

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");

    act(() => {
      focus(tab1);
    });

    await act(async () => {
      await userEvent.keyboard("[ArrowRight]");
    });

    expect(tab2).toHaveFocus();

    await act(async () => {
      await userEvent.keyboard("[ArrowRight]");
    });

    expect(tab3).toHaveFocus();

    await act(async () => {
      await userEvent.keyboard("[ArrowLeft]");
    });

    expect(tab2).toHaveFocus();

    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("aria-selected", "false");
    expect(tab3).toHaveAttribute("aria-selected", "false");
  });

  it("it should work with defaultSelectedKey", () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test" defaultSelectedKey="item2">
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" data-testid="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    const tab2 = wrapper.getByTestId("item2");

    expect(tab2).toHaveAttribute("aria-selected", "true");
  });

  it("should not select a tab when disabled", async () => {
    const wrapper = render(
      <Tabs aria-label="Tabs static test" disabledKeys={["item2"]}>
        <Tab key="item1" title="Item 1">
          <div>Content 1</div>
        </Tab>
        <Tab key="item2" data-testid="item2" title="Item 2">
          <div>Content 2</div>
        </Tab>
        <Tab key="item3" title="Item 3">
          <div>Content 3</div>
        </Tab>
      </Tabs>,
    );

    const tab2 = wrapper.getByTestId("item2");

    await act(async () => {
      await userEvent.click(tab2);
    });

    expect(tab2).toHaveAttribute("aria-selected", "false");
  });
});
