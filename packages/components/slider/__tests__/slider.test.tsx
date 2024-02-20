import * as React from "react";
import {render, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Slider, SliderValue} from "../src";

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

  it("should support minValue and maxValue", () => {
    const {getByRole} = render(
      <Slider aria-label="Range Slider Aria Label" maxValue={20} minValue={10} />,
    );

    const slider = getByRole("slider");

    expect(slider).toHaveProperty("min", "10");
    expect(slider).toHaveProperty("max", "20");
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

  it("should support range values", () => {
    const {getAllByRole} = render(
      <Slider aria-label="Range Slider Aria Label" defaultValue={[10, 20]} />,
    );

    const [leftSlider, rightSlider] = getAllByRole("slider");

    expect(leftSlider).toHaveProperty("value", "10");
    expect(leftSlider).toHaveAttribute("aria-valuetext", "10");

    expect(rightSlider).toHaveProperty("value", "20");
    expect(rightSlider).toHaveAttribute("aria-valuetext", "20");
  });

  it("should support controlled range values", async () => {
    const setValues: number[] = [];

    function Test() {
      const [value, _setValue] = React.useState<SliderValue>([10, 20]);
      const setValue = React.useCallback(
        (val) => {
          setValues.push(val);
          _setValue(val);
        },
        [_setValue],
      );

      return (
        <div>
          <Slider
            aria-label="Range Slider Aria Label"
            label="The Label"
            value={value}
            onChange={setValue}
          />
          <button onClick={() => setValue([15, 25])}>15, 25</button>
        </div>
      );
    }

    const {getAllByRole, getByRole} = render(<Test />);

    const [leftSlider, rightSlider] = getAllByRole("slider");
    const button = getByRole("button");

    expect(leftSlider).toHaveProperty("value", "10");
    expect(leftSlider).toHaveAttribute("aria-valuetext", "10");

    expect(rightSlider).toHaveProperty("value", "20");
    expect(rightSlider).toHaveAttribute("aria-valuetext", "20");

    // change slider value
    await act(async () => {
      await userEvent.click(button);
    });

    expect(leftSlider).toHaveProperty("value", "15");
    expect(leftSlider).toHaveAttribute("aria-valuetext", "15");

    expect(rightSlider).toHaveProperty("value", "25");
    expect(rightSlider).toHaveAttribute("aria-valuetext", "25");

    expect(setValues).toStrictEqual([[15, 25]]);
  });
});
