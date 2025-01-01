import * as React from "react";
import {render, renderHook, fireEvent, act} from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {useForm} from "react-hook-form";
import {Form} from "@nextui-org/form";

import {NumberField} from "../src";

describe("Input", () => {
  it("should render correctly", () => {
    const wrapper = render(<NumberField label="test input" />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<NumberField ref={ref} label="test input" />);
    expect(ref.current).not.toBeNull();
  });

  it("should have aria-invalid when invalid", () => {
    const {container} = render(<NumberField isInvalid={true} label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-invalid", "true");
  });

  it("should have aria-readonly when isReadOnly", () => {
    const {container} = render(<NumberField isReadOnly label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-readonly", "true");
  });

  it("should have disabled attribute when isDisabled", () => {
    const {container} = render(<NumberField isDisabled label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("disabled");
  });

  it("should disable the clear button when isDisabled", () => {
    const {getByRole} = render(
      <NumberField hideStepper isClearable isDisabled label="test input" />,
    );

    const clearButton = getByRole("button");

    expect(clearButton).toBeDisabled();
  });

  it("should not allow clear button to be focusable", () => {
    const {getByRole} = render(<NumberField hideStepper isClearable label="test input" />);

    const clearButton = getByRole("button");

    expect(clearButton).toHaveAttribute("tabIndex", "-1");
  });

  it("should have required attribute when isRequired with native validationBehavior", () => {
    const {container} = render(
      <NumberField isRequired label="test input" validationBehavior="native" />,
    );

    expect(container.querySelector("input")).toHaveAttribute("required");
    expect(container.querySelector("input")).not.toHaveAttribute("aria-required");
  });

  it("should have aria-required attribute when isRequired with aria validationBehavior", () => {
    const {container} = render(
      <NumberField isRequired label="test input" validationBehavior="aria" />,
    );

    expect(container.querySelector("input")).not.toHaveAttribute("required");
    expect(container.querySelector("input")).toHaveAttribute("aria-required", "true");
  });

  it("should have aria-describedby when description is provided", () => {
    const {container} = render(<NumberField description="description" label="test input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have aria-describedby when errorMessage is provided", () => {
    const {container} = render(
      <NumberField isInvalid errorMessage="error text" label="test input" />,
    );

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have the same aria-labelledby as label id", () => {
    const {container} = render(<NumberField label="test input" />);

    const labelId = container.querySelector("label")?.id;
    const labelledBy = container.querySelector("input")?.getAttribute("aria-labelledby");

    expect(labelledBy?.includes(labelId as string)).toBeTruthy();
  });

  it("should call dom event handlers only once", () => {
    const onFocus = jest.fn();

    const {container} = render(<NumberField label="test input" onFocus={onFocus} />);

    container.querySelector("input")?.focus();
    container.querySelector("input")?.blur();

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it("ref should update the value", () => {
    const ref = React.createRef<HTMLInputElement>();

    const {container} = render(<NumberField ref={ref} />);

    if (!ref.current) {
      throw new Error("ref is null");
    }
    const value = "1234";

    ref.current!.value = value;

    container.querySelector("input")?.focus();

    expect(ref.current?.value)?.toBe(value);
  });

  it("should clear the value and onClear is triggered", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLInputElement>();

    const {getByRole} = render(
      <NumberField
        ref={ref}
        hideStepper
        isClearable
        defaultValue={1234}
        label="test number-field"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button")!;

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(ref.current?.value)?.toBe("");

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("should disable clear button when isReadOnly is true", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLInputElement>();

    const {getByRole} = render(
      <NumberField
        ref={ref}
        hideStepper
        isClearable
        isReadOnly
        defaultValue={1234}
        label="test number-field"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button")!;

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(onClear).toHaveBeenCalledTimes(0);
  });
});

describe("NumberField with React Hook Form", () => {
  let input1: HTMLInputElement;
  let input2: HTMLInputElement;
  let input3: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let onSubmit: () => void;

  beforeEach(() => {
    const {result} = renderHook(() =>
      useForm({
        defaultValues: {
          withDefaultValue: 1234,
          withoutDefaultValue: undefined,
          requiredField: undefined,
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
        <NumberField isClearable label="With default value" {...register("withDefaultValue")} />
        <NumberField
          data-testid="input-2"
          label="Without default value"
          {...register("withoutDefaultValue")}
        />
        <NumberField
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
    submitButton = document.querySelector('button[type="submit"]')!;
  });

  it("should work with defaultValues", () => {
    expect(input1).toHaveValue("1234");
    expect(input2).not.toHaveValue();
    expect(input3).not.toHaveValue();
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    fireEvent.change(input3, {target: {value: 123}});

    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  describe("validation", () => {
    let user: UserEvent;

    beforeEach(() => {
      user = userEvent.setup();
    });

    describe("validationBehavior=native", () => {
      it("supports isRequired", async () => {
        const {getByTestId} = render(
          <Form data-testid="form">
            <NumberField isRequired data-testid="input" label="Name" validationBehavior="native" />
          </Form>,
        );

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).toHaveAttribute("required");
        expect(input).not.toHaveAttribute("aria-required");
        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(false);

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(document.activeElement).toBe(input);
        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Constraints not satisfied",
        );

        await user.keyboard("1234");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);

        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
      });

      it("supports validate function", async () => {
        const {getByTestId} = render(
          <Form data-testid="form">
            <NumberField
              data-testid="input"
              defaultValue={1234}
              label="Name"
              validate={(v) => (v === 1234 ? "Invalid width" : null)}
              validationBehavior="native"
            />
          </Form>,
        );

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(false);

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(document.activeElement).toBe(input);
        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid width",
        );

        await user.keyboard("1234");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);

        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
      });

      it("supports server validation", async () => {
        function Test() {
          let [serverErrors, setServerErrors] = React.useState({});
          let onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setServerErrors({
              name: "Invalid width.",
            });
          };

          return (
            <Form data-testid="form" validationErrors={serverErrors} onSubmit={onSubmit}>
              <NumberField
                data-testid="input"
                label="Name"
                name="name"
                validationBehavior="native"
              />
              <button data-testid="submit" type="submit">
                Submit
              </button>
            </Form>
          );
        }

        const {getByTestId} = render(<Test />);

        const input = getByTestId("input") as HTMLInputElement;
        const submitButton = getByTestId("submit");

        expect(input).not.toHaveAttribute("aria-describedby");

        await user.click(submitButton);
        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid width.",
        );
        expect(input.validity.valid).toBe(false);

        // Clicking twice doesn't clear server errors.
        await user.click(submitButton);
        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(document.activeElement).toBe(input);
        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid width.",
        );
        expect(input.validity.valid).toBe(false);

        await user.keyboard("1234");
        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);
      });
    });

    describe('validationBehavior="aria"', () => {
      it("supports validate function", async () => {
        const {getByTestId} = render(
          <Form data-testid="form">
            <NumberField
              data-testid="input"
              defaultValue={1234}
              label="Width"
              validate={(v) => (v === 1234 ? "Invalid width" : null)}
            />
          </Form>,
        );

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid width",
        );
        expect(input.validity.valid).toBe(true);

        await user.tab();
        await user.keyboard("1234");
        // TODO: fix this
        // expect(input).not.toHaveAttribute("aria-describedby");
        // expect(input).not.toHaveAttribute("aria-invalid");
      });

      it("supports server validation", async () => {
        const {getByTestId} = render(
          <Form validationErrors={{name: "Invalid width"}}>
            <NumberField data-testid="input" label="Name" name="name" />
          </Form>,
        );

        const input = getByTestId("input");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid width",
        );

        await user.tab();
        await user.keyboard("1234");
        await user.tab();

        // TODO: fix this
        // expect(input).not.toHaveAttribute("aria-describedby");
        // expect(input).not.toHaveAttribute("aria-invalid");
      });
    });
  });
});
