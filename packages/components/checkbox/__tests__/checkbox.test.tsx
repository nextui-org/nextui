import * as React from "react";
import {render, renderHook, act} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {useForm} from "react-hook-form";

import {Checkbox, CheckboxProps} from "../src";

describe("Checkbox", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(<Checkbox>Label</Checkbox>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Checkbox ref={ref}>Option</Checkbox>);
    expect(ref.current).not.toBeNull();
  });

  it("should work correctly with initial value", () => {
    let {container} = render(<Checkbox isSelected>Option</Checkbox>);

    expect(container.querySelector("input")?.checked).toBe(true);

    container = render(<Checkbox isSelected={false}>Option</Checkbox>).container;

    expect(container.querySelector("input")?.checked).toBe(false);
  });

  it("should change value after click", async () => {
    const wrapper = render(<Checkbox data-testid="checkbox-test">Option</Checkbox>);
    const checkbox = wrapper.container.querySelector("input")!;

    expect(checkbox.checked).toBe(false);

    await user.click(wrapper.getByTestId("checkbox-test"));

    expect(checkbox.checked).toBe(true);
  });

  it("should ignore events when disabled", async () => {
    const {container} = render(<Checkbox isDisabled>Option</Checkbox>);

    await user.click(container.querySelector("label")!);

    expect(container.querySelector("input")?.checked).toBe(false);
  });

  it("should work correctly with indeterminate value", () => {
    const {container} = render(<Checkbox isIndeterminate>Option</Checkbox>);

    expect(container.querySelector("input")?.indeterminate).toBe(true);
  });

  it('should work correctly with "onChange" prop', async () => {
    const onChange = jest.fn();
    const wrapper = render(
      <Checkbox data-testid="checkbox-test" onChange={onChange}>
        Option
      </Checkbox>,
    );

    await user.click(wrapper.getByTestId("checkbox-test"));

    expect(onChange).toHaveBeenCalled();
  });

  it('should work correctly with "onFocus" prop', () => {
    const onFocus = jest.fn();
    const wrapper = render(
      <Checkbox data-testid="checkbox-test" onFocus={onFocus}>
        Option
      </Checkbox>,
    );

    const input = wrapper.container.querySelector("input")!;

    act(() => {
      input.focus();
    });

    expect(onFocus).toHaveBeenCalled();
  });

  it("should have required attribute when isRequired with native validationBehavior", () => {
    const {container} = render(
      <Checkbox isRequired validationBehavior="native">
        Option
      </Checkbox>,
    );

    expect(container.querySelector("input")).toHaveAttribute("required");
    expect(container.querySelector("input")).not.toHaveAttribute("aria-required");
  });

  it("should have aria-required attribute when isRequired with aria validationBehavior", () => {
    const {container} = render(
      <Checkbox isRequired validationBehavior="aria">
        Option
      </Checkbox>,
    );

    expect(container.querySelector("input")).not.toHaveAttribute("required");
    expect(container.querySelector("input")).toHaveAttribute("aria-required", "true");
  });

  it("should work correctly with controlled value", async () => {
    const onChange = jest.fn();

    const Component = (props: CheckboxProps) => {
      const [value, setValue] = React.useState(false);

      return (
        <Checkbox
          {...props}
          isSelected={value}
          onValueChange={(checked) => {
            act(() => {
              setValue(checked);
              onChange(checked);
            });
          }}
        />
      );
    };

    const wrapper = render(
      <Component data-testid="checkbox-test" onChange={onChange}>
        Option
      </Component>,
    );

    await user.click(wrapper.getByTestId("checkbox-test"));

    expect(onChange).toHaveBeenCalled();
  });

  describe("validation", () => {
    describe("validationBehavior=native", () => {
      it("supports isRequired", async () => {
        const {getByRole, getByTestId} = render(
          <form data-testid="form">
            <Checkbox isRequired validationBehavior="native">
              Terms and conditions
            </Checkbox>
          </form>,
        );

        const checkbox = getByRole("checkbox") as HTMLInputElement;

        expect(checkbox).toHaveAttribute("required");
        expect(checkbox).not.toHaveAttribute("aria-required");
        expect(checkbox.validity.valid).toBe(false);

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        await user.click(checkbox);
        expect(checkbox.validity.valid).toBe(true);
      });
    });

    describe("validationBehavior=aria", () => {
      it("supports validate function", async () => {
        const {getByRole} = render(
          <Checkbox
            validate={(v) => (!v ? "You must accept the terms." : null)}
            validationBehavior="aria"
            value="terms"
          >
            Terms and conditions
          </Checkbox>,
        );

        const checkbox = getByRole("checkbox") as HTMLInputElement;

        expect(checkbox.validity.valid).toBe(true);

        await user.click(checkbox);
        expect(checkbox.validity.valid).toBe(true);
      });
    });
  });
});

describe("Checkbox with React Hook Form", () => {
  let checkbox1: HTMLInputElement;
  let checkbox2: HTMLInputElement;
  let checkbox3: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let onSubmit: () => void;

  beforeEach(() => {
    const {result} = renderHook(() =>
      useForm({
        defaultValues: {
          withDefaultValue: true,
          withoutDefaultValue: false,
          requiredField: false,
        },
      }),
    );

    const {
      handleSubmit,
      register,
      formState: {errors},
    } = result.current;

    onSubmit = jest.fn();

    render(
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Checkbox {...register("withDefaultValue")} />
        <Checkbox {...register("withoutDefaultValue")} />
        <Checkbox {...register("requiredField", {required: true})} />
        {errors.requiredField && <span className="text-danger">This field is required</span>}
        <button type="submit">Submit</button>
      </form>,
    );

    checkbox1 = document.querySelector("input[name=withDefaultValue]")!;
    checkbox2 = document.querySelector("input[name=withoutDefaultValue]")!;
    checkbox3 = document.querySelector("input[name=requiredField]")!;
    submitButton = document.querySelector("button")!;
  });

  it("should work with defaultValues", () => {
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(false);
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    const user = userEvent.setup();

    await user.click(checkbox3);

    expect(checkbox3.checked).toBe(true);

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
