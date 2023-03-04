import * as React from "react";
import {act, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {CheckboxGroup, Checkbox} from "../src";

describe("Checkbox.Group", () => {
  it("should render correctly", () => {
    const wrapper = render(
      <CheckboxGroup defaultValue={[]} label="Select cities">
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      </CheckboxGroup>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <CheckboxGroup ref={ref} defaultValue={[]} label="Select cities">
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      </CheckboxGroup>,
    );

    expect(ref.current).not.toBeNull();
  });

  it("should work correctly with initial value", () => {
    const {container} = render(
      <CheckboxGroup defaultValue={["sydney"]} label="Select cities">
        <Checkbox data-testid="first-checkbox" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox data-testid="second-checkbox" value="buenos-aires">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>,
    );

    // check if the first checkbox is checked
    expect(container.querySelector("[data-testid=first-checkbox] input")).toBeChecked();

    // second checkbox should not be checked
    expect(container.querySelector("[data-testid=second-checkbox] input")).not.toBeChecked();
  });

  it("should change value after click", () => {
    let value = ["sydney"];
    const wrapper = render(
      <CheckboxGroup
        defaultValue={["sydney"]}
        label="Select cities"
        onChange={(val) => act(() => (value = val))}
      >
        <Checkbox data-testid="first-checkbox" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox data-testid="second-checkbox" value="buenos-aires">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>,
    );

    const secondCheckbox = wrapper.getByTestId("second-checkbox");

    act(() => {
      secondCheckbox.click();
    });

    expect(value).toEqual(["sydney", "buenos-aires"]);
  });

  it("should ignore events when disabled", () => {
    const {container} = render(
      <CheckboxGroup isDisabled defaultValue={["sydney"]} label="Select cities">
        <Checkbox data-testid="first-checkbox" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox data-testid="second-checkbox" value="buenos-aires">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>,
    );

    const firstCheckbox = container.querySelector("[data-testid=first-checkbox] input");
    const secondCheckbox = container.querySelector("[data-testid=second-checkbox] input");

    expect(firstCheckbox).toBeChecked();
    expect(secondCheckbox).not.toBeChecked();

    secondCheckbox && userEvent.click(secondCheckbox);

    expect(firstCheckbox).toBeChecked();
    expect(secondCheckbox).not.toBeChecked();
  });

  it("should work correctly with controlled value", () => {
    let checked = ["sydney"];
    const onChange = jest.fn((value) => {
      checked = value;
    });

    const wrapper = render(
      <CheckboxGroup
        label="Select cities"
        value={checked}
        onChange={(checked) => {
          act(() => {
            onChange(checked);
          });
        }}
      >
        <Checkbox data-testid="first-checkbox" value="sydney">
          Sydney
        </Checkbox>
        <Checkbox data-testid="second-checkbox" value="buenos-aires">
          Buenos Aires
        </Checkbox>
      </CheckboxGroup>,
    );

    const secondCheckbox = wrapper.getByTestId("second-checkbox");

    act(() => {
      secondCheckbox.click();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(checked).toEqual(["sydney", "buenos-aires"]);
  });
});
