import * as React from "react";
import {act, render, renderHook} from "@testing-library/react";
import {useForm} from "react-hook-form";
import userEvent, {UserEvent} from "@testing-library/user-event";

import {InputOtp} from "../src";

describe("InputOtp", () => {
  let user: UserEvent;

  beforeAll(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(<InputOtp length={4} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<InputOtp ref={ref} length={4} />);
    expect(ref.current).not.toBeNull();
  });

  it("should have length according to the prop", async () => {
    render(<InputOtp length={5} />);
    const segments = document.querySelectorAll("[data-slot=segment]");

    expect(segments.length).toBe(5);
  });

  it("should display error message", async () => {
    const errorMessage = "custom error message";

    render(<InputOtp errorMessage={errorMessage} isInvalid={true} length={4} />);
    const base = document.querySelector("[data-slot=base]")!;

    expect(base).toHaveTextContent(errorMessage);
  });

  it("should display description message", async () => {
    const descriptionMessage = "custom description message";

    render(<InputOtp description={descriptionMessage} length={4} />);
    const base = document.querySelector("[data-slot=base]")!;

    expect(base).toHaveTextContent(descriptionMessage);
  });

  it("should not focus on disabled", async () => {
    render(<InputOtp isDisabled length={4} />);
    const input = document.querySelector("[data-slot=input]")!;

    await act(async () => {
      await user.click(input);
    });

    expect(input).not.toHaveAttribute("data-focus", "true");
  });

  it("should select first segment when clicked", async () => {
    render(<InputOtp length={4} />);
    const base = document.querySelector("[data-slot=base]")!;
    const input = document.querySelector("[data-slot=input]")!;
    const segments = document.querySelectorAll("[data-slot=segment]");

    expect(segments.length).toBe(4);

    await act(async () => {
      await user.click(input);
    });

    expect(base).toHaveAttribute("data-focus", "true");
    expect(input).toHaveAttribute("data-focus", "true");

    expect(segments[0]).toHaveAttribute("data-active", "true");
    expect(segments[1].getAttribute("data-active")).toBe(null);
    expect(segments[2].getAttribute("data-active")).toBe(null);
    expect(segments[3].getAttribute("data-active")).toBe(null);
  });

  it("should not be focused when disabled", async () => {
    render(<InputOtp isDisabled={true} length={4} />);
    const input = document.querySelector("[data-slot=input]")!;

    await act(async () => {
      await user.click(input);
    });

    expect(input).toBeDisabled();
  });

  it("should shift focus to next segment when valid digit is typed", async () => {
    render(<InputOtp length={4} />);

    const base = document.querySelector("[data-slot=base]")!;
    const input = document.querySelector("[data-slot=input]")!;
    const segments = document.querySelectorAll("[data-slot=segment]");

    expect(segments.length).toBe(4);

    await act(async () => {
      await user.click(input);
    });

    expect(base).toHaveAttribute("data-focus", "true");
    expect(input).toHaveAttribute("data-focus", "true");
    // since no input is entered hence segment[1] will not be active
    expect(segments[1].getAttribute("data-active")).toBe(null);

    await act(async () => {
      await user.keyboard("1");
    });

    // after the keypress, the focus should shift to segment[1]
    expect(segments[1]).toHaveAttribute("data-active", "true");
    expect(input).toHaveAttribute("value", "1");
  });

  it("should be able to erase the input", async () => {
    render(<InputOtp length={4} />);

    const input = document.querySelector("[data-slot=input]")!;
    const segments = document.querySelectorAll("[data-slot=segment]");

    expect(segments.length).toBe(4);

    // clicking on the component and typing in  "12"
    await act(async () => {
      await user.click(input);
      await user.keyboard("1");
      await user.keyboard("2");
    });

    // value should be "12" and segement[2] should be active
    expect(input).toHaveAttribute("value", "12");
    expect(segments[2]).toHaveAttribute("data-active", "true");

    // removing the data by pressing backspace
    await act(async () => {
      await user.keyboard("[BackSpace]");
    });

    // after one Backspace keypress, the value should be "1" and segment[1] should be active
    expect(input).toHaveAttribute("value", "1");
    expect(segments[1]).toHaveAttribute("data-active", "true");
  });

  it("should be able to paste value", async () => {
    render(<InputOtp length={4} />);

    const input = document.querySelector("[data-slot=input]")!;
    const segments = document.querySelectorAll("[data-slot=segment]");

    expect(segments.length).toBe(4);

    // clicking on the component and pasting in  "1234"
    await act(async () => {
      await user.click(input);
      await user.paste("1234");
    });

    // value should be "1234"
    expect(input).toHaveAttribute("value", "1234");
  });

  it("should not take non-allowed inputs", async () => {
    render(<InputOtp length={4} />);

    const input = document.querySelector("[data-slot=input]")!;
    const segments = document.querySelectorAll("[data-slot=segment]");

    expect(segments.length).toBe(4);

    // clicking on the component and typing the unallowed letter (here, "a")
    await act(async () => {
      await user.click(input);
      await user.keyboard("a");
    });

    // since unallowed letter was typed, "value" should remain empty and segment[0] remains active
    expect(segments[0]).toHaveAttribute("data-active", "true");
    expect(input).toHaveAttribute("value", "");
  });

  it("should allow inputs based on custom regex", async () => {
    // below exp matches with chars from small "a" to small "z"
    const regEx = "^[a-z]*$";

    render(<InputOtp allowedKeys={regEx} length={4} />);

    const input = document.querySelector("[data-slot=input]")!;
    const segments = document.querySelectorAll("[data-slot=segment]");

    expect(segments.length).toBe(4);

    // clicking on the component and typing the "a" letter
    await act(async () => {
      await user.click(input);
      await user.keyboard("a");
    });

    expect(segments[1]).toHaveAttribute("data-active", "true");
    expect(input).toHaveAttribute("value", "a");
  });

  it("should call onFill callback when inputOtp is completely filled", async () => {
    const onFill = jest.fn();

    render(<InputOtp length={4} onFill={onFill} />);

    const input = document.querySelector("[data-slot=input]")!;
    const segments = document.querySelectorAll("[data-slot=segment]");

    expect(segments.length).toBe(4);

    // clicking on the component and pasting "1234"
    await act(async () => {
      await user.click(input);
      await user.paste("1234");
    });

    expect(onFill).toHaveBeenCalledTimes(1);
  });
});

describe("InputOtp with react hook form", () => {
  let inputOtp1: Element;
  let inputOtp2: Element;
  let inputOtp3: Element;
  let submitButton: HTMLButtonElement;
  let onSubmit: () => void;
  let user: UserEvent;

  beforeAll(() => {
    user = userEvent.setup();
  });

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
        <InputOtp length={4} {...register("defaultValue")} />
        <InputOtp length={4} {...register("withoutDefaultValue")} />
        <InputOtp length={4} {...register("requiredField", {required: true})} />
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
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    await user.type(inputOtp3, "1234");

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
