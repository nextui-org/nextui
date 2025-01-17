import "@testing-library/jest-dom";

import * as React from "react";
import {render, renderHook, screen} from "@testing-library/react";
import {Controller, useForm} from "react-hook-form";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {Form} from "@heroui/form";

import {InputOtp} from "../src";

// Mock document.elementFromPoint to avoid test environment errors
beforeAll(() => {
  document.elementFromPoint = jest.fn(() => {
    const mockElement = document.createElement("div");

    return mockElement;
  });
});

describe("InputOtp Component", () => {
  let user: UserEvent;

  beforeAll(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(<InputOtp length={4} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should forward ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<InputOtp ref={ref} length={4} />);
    expect(ref.current).not.toBeNull();
  });

  it("should create segments according to length prop", () => {
    render(<InputOtp length={5} />);
    const segments = screen.getAllByRole("presentation");

    expect(segments.length).toBe(5);
  });

  it("should display error message when isInvalid is true", () => {
    const errorMessage = "custom error message";

    render(<InputOtp errorMessage={errorMessage} isInvalid={true} length={4} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should display description message", () => {
    const descriptionMessage = "custom description message";

    render(<InputOtp description={descriptionMessage} length={4} />);
    expect(screen.getByText(descriptionMessage)).toBeInTheDocument();
  });

  it("should not focus when disabled", async () => {
    render(<InputOtp isDisabled length={4} />);
    const input = screen.getByRole("textbox");

    await user.click(input);
    expect(input).not.toHaveAttribute("data-focus", "true");
  });

  it("should activate the first segment on click", async () => {
    render(<InputOtp length={4} />);
    const input = screen.getByRole("textbox");
    const segments = screen.getAllByRole("presentation");

    await user.click(input);
    expect(segments[0]).toHaveAttribute("data-active", "true");
    expect(segments[1]).not.toHaveAttribute("data-active");
  });

  it("should move focus to the next segment on valid input", async () => {
    render(<InputOtp length={4} />);
    const input = screen.getByRole("textbox");
    const segments = screen.getAllByRole("presentation");

    await user.click(input);
    expect(segments[1]).not.toHaveAttribute("data-active");

    await user.keyboard("1");
    expect(segments[1]).toHaveAttribute("data-active", "true");
    expect(input).toHaveAttribute("value", "1");
  });

  it("should clear input on backspace", async () => {
    render(<InputOtp length={4} />);
    const input = screen.getByRole("textbox");
    const segments = screen.getAllByRole("presentation");

    await user.click(input);
    await user.keyboard("12");
    expect(input).toHaveAttribute("value", "12");
    expect(segments[2]).toHaveAttribute("data-active", "true");

    await user.keyboard("[Backspace]");
    expect(input).toHaveAttribute("value", "1");
    expect(segments[1]).toHaveAttribute("data-active", "true");
  });

  it("should paste values", async () => {
    render(<InputOtp length={4} />);
    const input = screen.getByRole("textbox");

    await user.click(input);
    await user.paste("1234");
    expect(input).toHaveAttribute("value", "1234");

    // Test partial paste
    await user.clear(input);
    await user.paste("12");
    expect(input).toHaveAttribute("value", "12");

    // Test longer input
    await user.clear(input);
    await user.paste("12345");
    expect(input).toHaveAttribute("value", "1234");

    // Test invalid characters
    await user.clear(input);
    await user.paste("12ab");
    expect(input).toHaveAttribute("value", "");
  });

  it("should restrict non-allowed inputs", async () => {
    render(<InputOtp length={4} />);
    const input = screen.getByRole("textbox");
    const segments = screen.getAllByRole("presentation");

    await user.click(input);
    await user.keyboard("a");
    expect(input).toHaveAttribute("value", "");
    expect(segments[0]).toHaveAttribute("data-active", "true");
  });

  it("should allow inputs based on custom regex", async () => {
    const regEx = "^[a-z]*$";

    render(<InputOtp allowedKeys={regEx} length={4} />);
    const input = screen.getByRole("textbox");

    await user.click(input);
    await user.keyboard("a");
    expect(input).toHaveAttribute("value", "a");
  });

  it("should call onComplete when all segments are filled", async () => {
    const onComplete = jest.fn();

    render(<InputOtp length={4} onComplete={onComplete} />);
    const input = screen.getByRole("textbox");

    await user.click(input);
    await user.paste("1234");
    expect(onComplete).toHaveBeenCalledTimes(1);

    expect(onComplete).toHaveBeenCalledWith("1234");

    // Test partial input followed by paste
    await user.clear(input);
    await user.keyboard("1");
    await user.paste("234");
    expect(onComplete).toHaveBeenCalledTimes(2);
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("should autofocus when autofocus prop is passed.", () => {
    // eslint-disable-next-line jsx-a11y/no-autofocus
    render(<InputOtp autoFocus length={4} />);
    const segments = screen.getAllByRole("presentation");

    expect(segments[0]).toHaveAttribute("data-focus", "true");
  });

  it("should not autofocus when autofocus prop is not passed.", () => {
    render(<InputOtp length={4} />);
    const segments = screen.getAllByRole("presentation");

    expect(segments[0]).not.toHaveAttribute("data-focus", "true");
  });
});

describe("Validation", () => {
  let user: UserEvent;

  beforeAll(() => {
    user = userEvent.setup();
  });

  it("supports isRequired when validationBehavior=native", async () => {
    const {getByTestId} = render(
      <Form validationBehavior="native">
        <InputOtp isRequired data-testid="base" length={4} />
        <button data-testid="submit" type="submit" />
        <button data-testid="reset" type="reset" />
      </Form>,
    );

    const inputOtpBase = getByTestId("base");

    expect(inputOtpBase).toHaveAttribute("aria-required", "true");
    expect(inputOtpBase).not.toHaveAttribute("data-invalid");

    const submitButton = getByTestId("submit");

    await user.click(submitButton);

    expect(inputOtpBase).toHaveAttribute("data-invalid", "true");
    const errorMessage = document.querySelector("[data-slot='error-message']");

    expect(errorMessage).toBeInTheDocument();

    const resetButton = getByTestId("reset");

    await user.click(resetButton);

    expect(inputOtpBase).not.toHaveAttribute("data-invalid");
    expect(errorMessage).not.toBeInTheDocument();
  });
});

describe("InputOtp with react-hook-form", () => {
  let user: UserEvent;

  beforeAll(() => {
    user = userEvent.setup();
  });

  it("should integrate with react-hook-form correctly", async () => {
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

    const onSubmit = jest.fn();

    const {container} = render(
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputOtp data-testid="input-otp-1" length={4} {...register("defaultValue")} />
        <InputOtp data-testid="input-otp-2" length={4} {...register("withoutDefaultValue")} />
        <InputOtp
          data-testid="input-otp-3"
          length={4}
          {...register("requiredField", {required: true})}
        />
        {errors.requiredField && <span>This field is required</span>}
        <button type="submit">Submit</button>
      </form>,
    );

    const button = container.querySelector("button");

    if (!button) {
      throw new Error("Button not found");
    }

    await user.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(0);

    const inputOtp3 = screen.getByTestId("input-otp-3");
    const input = inputOtp3.querySelector("input");

    if (!input) {
      throw new Error("Input not found");
    }

    await user.click(input);

    await user.type(input, "1234");

    await user.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should work correctly wiht react-hook-form controller", async () => {
    const {result} = renderHook(() =>
      useForm({
        defaultValues: {
          withController: "",
        },
      }),
    );

    const {control} = result.current;

    render(
      <form>
        <Controller
          control={control}
          name="withController"
          render={({field}) => <InputOtp length={4} {...field} data-testid="input-otp" />}
        />
      </form>,
    );

    const inputOtp = screen.getByTestId("input-otp");
    const input = inputOtp.querySelector("input");

    if (!input) {
      throw new Error("Input not found");
    }

    await user.click(input);
    await user.type(input, "1nj23aa4");

    expect(input).toHaveAttribute("value", "1234");
  });
});
