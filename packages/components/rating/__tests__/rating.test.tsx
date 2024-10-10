import * as React from "react";
import {fireEvent, render, renderHook} from "@testing-library/react";
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
});

describe("Rating with React Hook Form", () => {
  let rating1: Element;
  let rating2: Element;
  let rating3: Element;
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
      </form>,
    );

    rating1 = document.querySelectorAll("[data-slot=input]")[0]!;
    rating2 = document.querySelectorAll("[data-slot=input]")[1]!;
    rating3 = document.querySelectorAll("[data-slot=input]")[2]!;
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
    fireEvent.change(rating3, {target: {value: "2"}});

    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
