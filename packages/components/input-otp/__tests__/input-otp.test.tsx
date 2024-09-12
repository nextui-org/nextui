import * as React from "react";
import {fireEvent, render, renderHook} from "@testing-library/react";
import {useForm} from "react-hook-form";
import userEvent from "@testing-library/user-event";

import {InputOtp} from "../src";

describe("InputOtp", () => {
  it("should render correctly", () => {
    const wrapper = render(<InputOtp total={4} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<InputOtp ref={ref} total={4} />);
    expect(ref.current).not.toBeNull();
  });
});

describe("InputOtp with react hook form", () => {
  let inputOtp1: Element;
  let inputOtp2: Element;
  let inputOtp3: Element;
  let submitButton: HTMLButtonElement;
  let onSubmit: () => void;

  beforeEach(() => {
    const {result} = renderHook(() =>
      useForm({
        defaultValues: {
          defaultValue: "1234",
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
        <InputOtp total={4} {...register("defaultValue")} />
        <InputOtp total={4} {...register("withoutDefaultValue")} />
        <InputOtp total={4} {...register("requiredField", {required: true})} />
        {errors.requiredField && <span className="text-danger">This field is required</span>}
        <button type="submit">Submit</button>
      </form>,
    );

    inputOtp1 = document.querySelectorAll("[data-slot=input]")[0]!;
    inputOtp2 = document.querySelectorAll("[data-slot=input]")[1]!;
    inputOtp3 = document.querySelectorAll("[data-slot=input]")[2]!;
    submitButton = document.querySelector("button")!;
  });

  it("should work with defaultValues", () => {
    expect(inputOtp1).toHaveValue("1234");
    expect(inputOtp2).toHaveValue("");
    expect(inputOtp3).toHaveValue("");
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    fireEvent.change(inputOtp3, {target: {value: "1234"}});

    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
