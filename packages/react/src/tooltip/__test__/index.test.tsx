import React from "react";
import {mount, ReactWrapper} from "enzyme";
import {nativeEvent, updateWrapper} from "tests/utils";
import {act} from "react-dom/test-utils";

import {Button, Tooltip} from "../../index";

const expectTooltipIsShow = (wrapper: ReactWrapper) => {
  expect(wrapper.find(".nextui-tooltip").length).not.toBe(0);
  expect(wrapper.find(".nextui-tooltip").at(0).prop("role")).toEqual("tooltip");
};

const expectTooltipIsHidden = (wrapper: ReactWrapper) => {
  expect(wrapper.find(".nextui-tooltip").at(0).length).toBe(0);
};

describe("Tooltip", () => {
  it("should render correctly", async () => {
    const wrapper = mount(
      <Tooltip content={<p className="test-content">custom-content</p>}>some tips</Tooltip>,
    );

    expectTooltipIsHidden(wrapper);

    wrapper.find(".nextui-tooltip-button").at(0).simulate("mouseEnter", nativeEvent);

    await updateWrapper(wrapper, 150);

    wrapper.find(".test-content").at(0).simulate("click", nativeEvent);
    expectTooltipIsShow(wrapper);

    await updateWrapper(wrapper, 150);
    wrapper.find(".nextui-tooltip-button").at(0).simulate("mouseLeave", nativeEvent);

    await updateWrapper(wrapper, 150);
    expectTooltipIsHidden(wrapper);
  });

  it("should render text when hover it", async () => {
    const wrapper = mount(
      <div>
        <Tooltip content="some text">some tips</Tooltip>
      </div>,
    );

    wrapper.find(".nextui-tooltip-button").at(0).simulate("mouseEnter", nativeEvent);
    await updateWrapper(wrapper, 150);
    expectTooltipIsShow(wrapper);

    wrapper.find(".nextui-tooltip-button").at(0).simulate("mouseLeave", nativeEvent);
    await updateWrapper(wrapper, 150);
    expectTooltipIsHidden(wrapper);
  });

  it("should render text when focus it", async () => {
    const wrapper = mount(
      <div>
        <Tooltip content="some text">some tips</Tooltip>
      </div>,
    );

    wrapper.find(".nextui-tooltip-button").at(0).simulate("focus", nativeEvent);
    await updateWrapper(wrapper, 150);
    expectTooltipIsShow(wrapper);

    wrapper.find(".nextui-tooltip-button").at(0).simulate("blur", nativeEvent);
    await updateWrapper(wrapper, 150);
    expectTooltipIsHidden(wrapper);
  });

  it("should render react-node when click it", async () => {
    const wrapper = mount(
      <Tooltip content={<p id="test">custom-content</p>} trigger="click">
        <span>click me</span>
      </Tooltip>,
    );

    wrapper.find(".nextui-tooltip-button").at(0).simulate("click", nativeEvent);
    await updateWrapper(wrapper, 150);
    expectTooltipIsShow(wrapper);

    const testNode = wrapper.find("#test").at(0);

    expect(testNode.length).not.toBe(0);
    expect(testNode.text()).toContain("custom-content");
    act(() => {
      document.body.dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    await updateWrapper(wrapper, 150);
    expectTooltipIsHidden(wrapper);
  });

  it("should render inner components", async () => {
    const wrapper = mount(
      <Tooltip content="some text">
        <Button auto id="test" size="sm">
          button
        </Button>
      </Tooltip>,
    );

    expect(wrapper.find("#test").length).not.toBe(0);
  });

  it("should render correctly by visible", async () => {
    const wrapper = mount(
      <div>
        <Tooltip content={<p id="visible">custom-content</p>} placement="rightEnd" visible={true}>
          some tips
        </Tooltip>
      </div>,
    );

    await updateWrapper(wrapper, 150);
    expect(wrapper.find("#visible").length).toBe(1);
  });

  it("should render correctly by using wrong placement", async () => {
    const wrapper = mount(
      <div>
        <Tooltip
          content={<p id="initial-visible">custom-content</p>}
          initialVisible={true}
          placement={"test" as any}
        >
          some tips
        </Tooltip>
      </div>,
    );

    expect(wrapper.find("#initial-visible").length).toBe(1);
  });

  it("should not render when no content present", async () => {
    const wrapper = mount(
      <div>
        <Tooltip content="">some tips</Tooltip>
      </div>,
    );

    expect(wrapper.find("#visible").length).toBe(0);
  });
});
