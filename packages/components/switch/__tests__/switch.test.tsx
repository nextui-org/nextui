import * as React from "react";
import {act, render} from "@testing-library/react";

import {Switch} from "../src";

describe("Switch", () => {
  it("should render correctly", () => {
    const wrapper = render(<Switch aria-label="switch" />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Switch ref={ref} aria-label="switch" />);
    expect(ref.current).not.toBeNull();
  });

  it("should check and uncheck", () => {
    const {getByRole} = render(<Switch aria-label="switch" />);

    const checkbox = getByRole("switch");

    expect(checkbox).not.toBeChecked();

    act(() => {
      checkbox.click();
    });

    expect(checkbox).toBeChecked();

    act(() => {
      checkbox.click();
    });

    expect(checkbox).not.toBeChecked();
  });

  it("should not check if disabled", () => {
    const {getByRole} = render(<Switch isDisabled aria-label="switch" />);

    const checkbox = getByRole("switch");

    act(() => {
      checkbox.click();
    });

    expect(checkbox).not.toBeChecked();
  });

  it("should be checked if defaultSelected", () => {
    const {getByRole} = render(<Switch defaultSelected aria-label="switch" />);

    const checkbox = getByRole("switch");

    expect(checkbox).toBeChecked();
  });

  it("should not check if readOnly", () => {
    const {getByRole} = render(<Switch isReadOnly aria-label="switch" />);

    const checkbox = getByRole("switch");

    act(() => {
      checkbox.click();
    });

    expect(checkbox).not.toBeChecked();
  });

  it("should check and uncheck with controlled state", () => {
    const ControlledSwitch = ({onChange}: any) => {
      const [isSelected, setIsSelected] = React.useState(false);

      return (
        <Switch
          aria-label="switch"
          isSelected={isSelected}
          onValueChange={(selected) => {
            onChange?.(selected);
            setIsSelected(selected);
          }}
        />
      );
    };

    const onChange = jest.fn();

    const {getByRole} = render(<ControlledSwitch onChange={onChange} />);

    const checkbox = getByRole("switch");

    expect(checkbox).not.toBeChecked();

    act(() => {
      checkbox.click();
    });

    expect(checkbox).toBeChecked();

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("should render the thumbIcon", () => {
    const wrapper = render(
      <Switch aria-label="switch" thumbIcon={<svg data-testid="thumb-icon" />} />,
    );

    expect(wrapper.getByTestId("thumb-icon")).toBeInTheDocument();
  });

  it('should work with thumbIcon as "function"', () => {
    const thumbIcon = jest.fn(() => <svg data-testid="thumb-icon" />);

    const wrapper = render(<Switch aria-label="switch" thumbIcon={thumbIcon} />);

    expect(thumbIcon).toHaveBeenCalled();
    expect(wrapper.getByTestId("thumb-icon")).toBeInTheDocument();
  });

  it("should change the thumbIcon when clicked", () => {
    const thumbIcon = jest.fn((props) => {
      const {isSelected} = props;

      return isSelected ? (
        <svg data-testid="checked-thumb-icon" />
      ) : (
        <svg data-testid="unchecked-thumb-icon" />
      );
    });

    const {getByRole, container} = render(<Switch aria-label="switch" thumbIcon={thumbIcon} />);

    const checkbox = getByRole("switch");

    expect(checkbox).not.toBeChecked();

    act(() => {
      checkbox.click();
    });

    expect(checkbox).toBeChecked();

    expect(thumbIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        isSelected: true,
      }),
    );

    const checkedthumbIcon = container.querySelector("[data-testid=checked-thumb-icon]");

    expect(checkedthumbIcon).toBeInTheDocument();

    act(() => {
      checkbox.click();
    });

    expect(checkbox).not.toBeChecked();

    expect(thumbIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        isSelected: false,
      }),
    );

    const uncheckedthumbIcon = container.querySelector("[data-testid=unchecked-thumb-icon]");

    expect(uncheckedthumbIcon).toBeInTheDocument();
  });

  it('should work with "startContent"', () => {
    const wrapper = render(
      <Switch aria-label="switch" startContent={<svg data-testid="start-icon" />} />,
    );

    expect(wrapper.getByTestId("start-icon")).toBeInTheDocument();
  });

  it('should work with "endContent"', () => {
    const wrapper = render(
      <Switch aria-label="switch" endContent={<svg data-testid="end-icon" />} />,
    );

    expect(wrapper.getByTestId("end-icon")).toBeInTheDocument();
  });

  it('should work with "startContent" and "endContent"', () => {
    const wrapper = render(
      <Switch
        aria-label="switch"
        endContent={<svg data-testid="end-icon" />}
        startContent={<svg data-testid="start-icon" />}
      />,
    );

    expect(wrapper.getByTestId("start-icon")).toBeInTheDocument();
    expect(wrapper.getByTestId("end-icon")).toBeInTheDocument();
  });
});
