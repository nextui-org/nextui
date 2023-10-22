import * as React from "react";
import {render, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Slider, SliderValue} from "../src";

import drag from "./drag";

describe("Slider", () => {
  it("should render correctly", () => {
    const wrapper = render(<Slider />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Slider ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should support aria-label", () => {
    const {getByRole} = render(<Slider aria-label="Aria Label" />);

    const group = getByRole("group");

    expect(group).toHaveAttribute("aria-label", "Aria Label");
  });

  it("should support label", () => {
    const {getByRole, container} = render(<Slider label="Label" />);

    const group = getByRole("group");
    const labelId = group.getAttribute("aria-labelledby");
    const slider = getByRole("slider");

    // has label
    const label = container.querySelector(`label[id="${labelId}"]`);

    expect(label).toHaveTextContent("Label");

    // shows value as well
    const output = getByRole("status");

    expect(output).toHaveTextContent("0");
    expect(output).toHaveAttribute("for", slider.id);
    expect(output).not.toHaveAttribute("aria-labelledby");
    expect(output).toHaveAttribute("aria-live", "off");
  });

  it("should support isDisabled", async function () {
    const {getByRole, getAllByRole} = render(
      <div>
        <button>A</button>
        <Slider isDisabled />
        <button>B</button>
      </div>,
    );

    const slider = getByRole("slider");
    const [buttonA, buttonB] = getAllByRole("button");

    expect(slider).toBeDisabled();

    await userEvent.tab();
    expect(document.activeElement).toBe(buttonA);
    await userEvent.tab();
    expect(document.activeElement).toBe(buttonB);
  });

  it("should supports focus", async function () {
    const {getByRole, getAllByRole} = render(
      <div>
        <button>A</button>
        <Slider defaultValue={20} label="The Label" />
        <button>B</button>
      </div>,
    );

    const slider = getByRole("slider");
    const [buttonA, buttonB] = getAllByRole("button");

    act(() => {
      slider.focus();
    });

    expect(document.activeElement).toBe(slider);

    await userEvent.tab();

    expect(document.activeElement).toBe(buttonB);

    await userEvent.tab({shift: true});
    await userEvent.tab({shift: true});

    expect(document.activeElement).toBe(buttonA);
  });

  it("should supports controlled value", async () => {
    const setValues: number[] = [];

    function Test() {
      const [value, _setValue] = React.useState<SliderValue>(50);
      const setValue = React.useCallback(
        (val) => {
          setValues.push(val);
          _setValue(val);
        },
        [_setValue],
      );

      return (
        <div>
          <Slider label="The Label" value={value} onChange={setValue} />

          <button onClick={() => setValue(55)}>55</button>
        </div>
      );
    }

    const {getByRole} = render(<Test />);

    const output = getByRole("status");
    const slider = getByRole("slider");
    const button = getByRole("button");

    expect(slider).toHaveProperty("value", "50");
    expect(slider).toHaveAttribute("aria-valuetext", "50");
    expect(output).toHaveTextContent("50");

    // change slider value
    await act(async () => {
      await userEvent.click(button);
    });

    expect(slider).toHaveProperty("value", "55");
    expect(slider).toHaveAttribute("aria-valuetext", "55");
    expect(output).toHaveTextContent("55");

    expect(setValues).toStrictEqual([55]);
  });

  it("should not get stuck at the end when dragging", async function () {
    const {getByRole, getAllByRole} = render(<Slider hasSingleThumb={false} />);

    const [leftHandle, rightHandle] = getAllByRole("slider");
    const output = getByRole("status");

    const MORE_THAN_SLIDER_WIDTH = 600;

    await drag(rightHandle, {
      delta: {x: MORE_THAN_SLIDER_WIDTH, y: 0},
    });
    await drag(leftHandle, {
      delta: {x: MORE_THAN_SLIDER_WIDTH, y: 0},
    });
    // It actually drags the leftHandle, because it's on top
    await drag(rightHandle, {
      delta: {x: -1 * MORE_THAN_SLIDER_WIDTH, y: 0},
    });

    expect(leftHandle).toHaveProperty("value", "0");
    expect(leftHandle).toHaveAttribute("aria-valuetext", "0");
    expect(output).toHaveTextContent("0");

    expect(rightHandle).toHaveProperty("value", "100");
    expect(rightHandle).toHaveAttribute("aria-valuetext", "100");
    expect(output).toHaveTextContent("100");
  });
});
