import * as React from "react";
import {act, render, renderHook} from "@testing-library/react";
import {focus} from "@nextui-org/test-utils";
import {useForm} from "react-hook-form";
import userEvent from "@testing-library/user-event";

import {Rating} from "../src";

describe("Rating", () => {
  it("should render correctly", () => {
    const wrapper = render(<Rating length={5} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<Rating ref={ref} length={5} />);
    expect(ref.current).not.toBeNull();
  });

  it("should have description when added", async () => {
    const description = "description message";

    render(<Rating description={description} length={5} />);

    const input = document.querySelector("[data-slot=base]")!;

    expect(input).toHaveTextContent(description);
  });

  it("should have the icons according to the length", async () => {
    render(<Rating length={3} />);

    const icons = document.querySelectorAll("[data-slot=icon]");

    expect(icons.length).toBe(3);
  });

  it("should be able to reset the rating value after being selected once", async () => {
    render(<Rating length={3} />);

    const input = document.querySelectorAll("[data-slot=input]")[0];
    const radioButtonForValueZero = document.querySelectorAll("[data-slot=radio]")[0];
    const radioButtonForValueOne = document.querySelectorAll("[data-slot=radio]")[1];

    const user = userEvent.setup();

    await user.click(radioButtonForValueOne);
    expect(input).toHaveValue(1);

    await user.click(radioButtonForValueZero);
    expect(input).toHaveValue(0);
  });

  it("should be able to change the rating value on keypress", async () => {
    render(<Rating length={3} />);

    const input = document.querySelectorAll("[data-slot=input]")[0];
    const radioButtonForValueOne = document.querySelectorAll("[data-slot=radio]")[1] as HTMLElement;
    const radioButtonForValueTwo = document.querySelectorAll("[data-slot=radio]")[2] as HTMLElement;

    const user = userEvent.setup();

    await user.click(radioButtonForValueOne);
    expect(input).toHaveValue(1);

    act(() => {
      focus(radioButtonForValueOne);
    });
    await user.keyboard("[ArrowRight]");
    expect(input).toHaveValue(2);

    act(() => {
      focus(radioButtonForValueTwo);
    });
    await user.keyboard("[ArrowLeft]");
    expect(input).toHaveValue(1);
  });
});

describe("validation", () => {
  let user = userEvent.setup();

  beforeAll(() => {
    user = userEvent.setup();
  });

  it("should support native validationBehaviour", async () => {
    const {getAllByRole, getByTestId} = render(
      <form data-testid="form">
        <Rating isRequired length={5} validationBehavior="native" />
      </form>,
    );

    const radios = getAllByRole("radio") as HTMLInputElement[];

    for (let input of radios) {
      expect(input).toHaveAttribute("required");
      expect(input).not.toHaveAttribute("aria-required");
      expect(input.validity.valid).toBe(false);
    }

    act(() => {
      (getByTestId("form") as HTMLFormElement).checkValidity();
    });
    expect(document.activeElement).toBe(radios[0]);

    await user.click(radios[0]);
    for (let input of radios) {
      expect(input.validity.valid).toBe(true);
    }
  });

  it("should support aria validationBehaviour", async () => {
    const {getByRole, getAllByRole} = render(
      <form data-testid="form">
        <Rating
          defaultValue="1"
          length={5}
          validate={(v) => (v === "1" ? "Too scary" : null)}
          validationBehavior="aria"
        />
      </form>,
    );

    const group = getByRole("radiogroup");

    expect(group).toHaveAttribute("aria-describedby");
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(
      document.getElementById(group.getAttribute("aria-describedby") as string),
    ).toHaveTextContent("Too scary");

    const radios = getAllByRole("radio") as HTMLInputElement[];

    for (let input of radios) {
      expect(input.validity.valid).toBe(true);
    }

    await user.click(radios[0]);
    expect(group).not.toHaveAttribute("aria-describedby");
    expect(group).not.toHaveAttribute("aria-invalid");
  });
});

describe("Rating with React Hook Form", () => {
  let rating1: Element;
  let rating2: Element;
  let rating3: Element;
  let radioButtonRating3: Element;
  let submitButton: HTMLButtonElement;
  let onSubmit: () => void;

  beforeEach(() => {
    const {result} = renderHook(() =>
      useForm({
        defaultValues: {
          withDefaultValue: "2",
          withoutDefaultValue: "",
          requiredField: "",
        },
      }),
    );

    const {handleSubmit, register} = result.current;

    onSubmit = jest.fn();

    render(
      <>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Rating data-testid="input-1" {...register("withDefaultValue")} length={5} />
          <Rating data-testid="input-2" {...register("withoutDefaultValue")} length={5} />
          <Rating
            data-testid="input-3"
            label="Required"
            {...register("requiredField", {required: true})}
            length={5}
          />
          <button type="submit">Submit</button>
        </form>
      </>,
    );

    rating1 = document.querySelectorAll("[data-slot=input]")[0]!;
    rating2 = document.querySelectorAll("[data-slot=input]")[1]!;
    rating3 = document.querySelectorAll("[data-slot=input]")[2]!;
    radioButtonRating3 = document.querySelectorAll("[data-slot=radio]")[13]!;
    submitButton = document.querySelector("button")!;
  });

  it("should work with defaultValues", () => {
    expect(rating1).toHaveValue(2);
    expect(rating2).toHaveValue(null);
    expect(rating3).toHaveValue(null);
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    const user = userEvent.setup();

    await user.click(radioButtonRating3);
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
