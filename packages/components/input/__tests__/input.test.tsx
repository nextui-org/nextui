import * as React from "react";
import {render, renderHook, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {useForm} from "react-hook-form";

import {Input} from "../src";

describe("Input", () => {
  it("should render correctly", () => {
    const wrapper = render(<Input label="test input" />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Input ref={ref} label="test input" />);
    expect(ref.current).not.toBeNull();
  });

  it("should have aria-invalid when invalid", () => {
    const {container} = render(<Input isInvalid={true} label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-invalid", "true");
  });

  it("should have aria-readonly when isReadOnly", () => {
    const {container} = render(<Input isReadOnly label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-readonly", "true");
  });

  it("should have disabled attribute when isDisabled", () => {
    const {container} = render(<Input isDisabled label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("disabled");
  });

  it("should have required attribute when isRequired with native validationBehavior", () => {
    const {container} = render(<Input isRequired label="test input" validationBehavior="native" />);

    expect(container.querySelector("input")).toHaveAttribute("required");
    expect(container.querySelector("input")).not.toHaveAttribute("aria-required");
  });

  it("should have aria-required attribute when isRequired with aria validationBehavior", () => {
    const {container} = render(<Input isRequired label="test input" validationBehavior="aria" />);

    expect(container.querySelector("input")).not.toHaveAttribute("required");
    expect(container.querySelector("input")).toHaveAttribute("aria-required", "true");
  });

  it("should have aria-describedby when description is provided", () => {
    const {container} = render(<Input description="help text" label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have aria-describedby when errorMessage is provided", () => {
    const {container} = render(<Input isInvalid errorMessage="error text" label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have the same aria-labelledby as label id", () => {
    const {container} = render(<Input label="test input" />);

    const labelId = container.querySelector("label")?.id;
    const labelledBy = container.querySelector("input")?.getAttribute("aria-labelledby");

    expect(labelledBy?.includes(labelId as string)).toBeTruthy();
  });

  it("should have the correct type attribute", () => {
    const {container} = render(<Input label="test input" type="email" />);

    expect(container.querySelector("input")).toHaveAttribute("type", "email");

    const {container: container2} = render(<Input label="test input" type="number" />);

    expect(container2.querySelector("input")).toHaveAttribute("type", "number");

    const {container: container3} = render(<Input label="test input" type="password" />);

    expect(container3.querySelector("input")).toHaveAttribute("type", "password");

    const {container: container4} = render(<Input label="test input" type="search" />);

    expect(container4.querySelector("input")).toHaveAttribute("type", "search");

    const {container: container5} = render(<Input label="test input" type="tel" />);

    expect(container5.querySelector("input")).toHaveAttribute("type", "tel");

    const {container: container6} = render(<Input label="test input" type="text" />);

    expect(container6.querySelector("input")).toHaveAttribute("type", "text");
  });

  it("should call dom event handlers only once", () => {
    const onFocus = jest.fn();

    const {container} = render(<Input label="test input" onFocus={onFocus} />);

    container.querySelector("input")?.focus();
    container.querySelector("input")?.blur();

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("ref should update the value", () => {
    const ref = React.createRef<HTMLInputElement>();

    const {container} = render(<Input ref={ref} type="text" />);

    if (!ref.current) {
      throw new Error("ref is null");
    }
    const value = "value";

    ref.current!.value = value;

    container.querySelector("input")?.focus();

    expect(ref.current?.value)?.toBe(value);
  });

  it("should clear the value and onClear is triggered", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLInputElement>();

    const {getByRole} = render(
      <Input
        ref={ref}
        isClearable
        defaultValue="junior@nextui.org"
        label="test input"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button");

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(ref.current?.value)?.toBe("");

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});

describe("Input with React Hook Form", () => {
  let input1: HTMLInputElement;
  let input2: HTMLInputElement;
  let input3: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let onSubmit: () => void;

  beforeEach(() => {
    const {result} = renderHook(() =>
      useForm({
        defaultValues: {
          withDefaultValue: "wkw",
          withoutDefaultValue: "",
          requiredField: "",
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
        <Input isClearable label="With default value" {...register("withDefaultValue")} />
        <Input
          data-testid="input-2"
          label="Without default value"
          {...register("withoutDefaultValue")}
        />
        <Input
          data-testid="input-3"
          label="Required"
          {...register("requiredField", {required: true})}
        />
        {errors.requiredField && <span className="text-danger">This field is required</span>}
        <button type="submit">Submit</button>
      </form>,
    );

    input1 = document.querySelector("input[name=withDefaultValue]")!;
    input2 = document.querySelector("input[name=withoutDefaultValue]")!;
    input3 = document.querySelector("input[name=requiredField]")!;
    submitButton = document.querySelector("button")!;
  });

  it("should work with defaultValues", () => {
    expect(input1).toHaveValue("wkw");
    expect(input2).toHaveValue("");
    expect(input3).toHaveValue("");
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    fireEvent.change(input3, {target: {value: "updated"}});

    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
