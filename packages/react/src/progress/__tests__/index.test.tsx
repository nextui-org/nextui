import {mount} from "enzyme";
import React from "react";

import Progress from "../progress";

describe("Progress", () => {
  it("should render correctly", () => {
    const wrapper = mount(<Progress value={50} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should support all colors", () => {
    const wrapper = mount(
      <div>
        <Progress color="primary" value={45} />
        <Progress color="secondary" value={45} />
        <Progress color="success" value={45} />
        <Progress color="warning" value={45} />
        <Progress color="error" value={45} />
        <Progress color="gradient" value={45} />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should support all status colors", () => {
    const wrapper = mount(
      <div>
        <Progress color="primary" status="primary" value={45} />
        <Progress color="secondary" status="secondary" value={45} />
        <Progress color="success" status="success" value={45} />
        <Progress color="warning" status="warning" value={45} />
        <Progress color="error" status="error" value={45} />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should show different progress by maximum", () => {
    const wrapper = mount(
      <div>
        <Progress max={60} value={59} />
        <Progress max={50} value={21} />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should support shadow", () => {
    const wrapper = mount(
      <div>
        <Progress shadow max={60} value={59} />
        <Progress shadow max={50} value={21} />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should support indeterminated", () => {
    const wrapper = mount(
      <div>
        <Progress indeterminated max={60} value={59} />
        <Progress indeterminated max={50} value={21} />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should support no animated", () => {
    const wrapper = mount(
      <div>
        <Progress animated={false} max={60} value={59} />
        <Progress animated={false} max={50} value={21} />
      </div>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should ignore a value under the minimum", () => {
    const value = 10;
    const minValue = 20;
    const wrapper = mount(<Progress max={60} min={minValue} value={value} />);
    const props = wrapper.find(".nextui-progress-bar").at(0).props();

    expect(() => props["aria-valuenow"] === minValue).toBeTruthy();
  });

  it("should ignore a value above the max", () => {
    const value = 30;
    const maxValue = 20;
    const wrapper = mount(<Progress max={maxValue} min={0} value={value} />);
    const props = wrapper.find(".nextui-progress-bar").at(0).props();

    expect(() => props["aria-valuenow"] === maxValue).toBeTruthy();
  });
});
