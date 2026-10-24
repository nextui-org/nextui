import type {ComponentProps} from "react";
import type {TimeValue} from "react-aria-components";

import {render, screen, setupUser} from "@heroui/testing/helpers";
import {Time} from "@internationalized/date";

import {Description} from "@/components/description";
import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";
import {TimeField} from "@/components/time-field";

const renderTimeField = (props: Partial<ComponentProps<typeof TimeField>> = {}) =>
  render(
    <TimeField name="time" {...props}>
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
      </TimeField.Group>
    </TimeField>,
  );

describe("TimeField", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders segmented spinbuttons for hour, minute, and day period", () => {
    renderTimeField({defaultValue: new Time(9, 30)});

    const segments = screen.getAllByRole("spinbutton");

    expect(segments).toHaveLength(3);
    expect(screen.getByRole("spinbutton", {name: /hour/i})).toHaveTextContent("9");
    expect(screen.getByRole("spinbutton", {name: /minute/i})).toHaveTextContent("30");
    expect(screen.getByRole("spinbutton", {name: /AM\/PM/i})).toHaveTextContent("AM");
  });

  it("exposes data-slots and BEM block", () => {
    renderTimeField();

    expect(document.querySelector('[data-slot="time-field"]')?.className).toEqual(
      expect.stringContaining("time-field"),
    );
    expect(document.querySelector('[data-slot="date-input-group"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="date-input-group-input"]')).not.toBeNull();
    expect(
      document.querySelectorAll('[data-slot="date-input-group-segment"][role="spinbutton"]').length,
    ).toBe(3);
  });

  it("supports fullWidth prop as a BEM modifier", () => {
    renderTimeField({fullWidth: true});

    expect(document.querySelector('[data-slot="time-field"]')?.className).toEqual(
      expect.stringContaining("time-field--full-width"),
    );
  });

  it("supports incrementing and decrementing the minute segment", async () => {
    const onChange = vi.fn();

    renderTimeField({defaultValue: new Time(9, 30), onChange});

    const minute = screen.getByRole("spinbutton", {name: /minute/i});

    await user.click(minute);
    await user.keyboard("{ArrowUp}");

    expect(onChange).toHaveBeenCalled();
    let value = onChange.mock.calls.at(-1)?.[0] as TimeValue;

    expect(value.hour).toBe(9);
    expect(value.minute).toBe(31);

    await user.keyboard("{ArrowDown}");
    value = onChange.mock.calls.at(-1)?.[0] as TimeValue;
    expect(value.minute).toBe(30);
  });

  it("supports toggling AM/PM on the day period segment", async () => {
    const onChange = vi.fn();

    renderTimeField({defaultValue: new Time(9, 30), onChange});

    const dayPeriod = screen.getByRole("spinbutton", {name: /AM\/PM/i});

    await user.click(dayPeriod);
    await user.keyboard("{ArrowUp}");

    expect(onChange).toHaveBeenCalled();
    const value = onChange.mock.calls.at(-1)?.[0] as TimeValue;

    expect(value.hour).toBe(21);
    expect(dayPeriod).toHaveTextContent("PM");
  });

  it("supports controlled value", () => {
    const onChange = vi.fn();

    const {rerender} = render(
      <TimeField name="time" value={new Time(9, 30)} onChange={onChange}>
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
      </TimeField>,
    );

    expect(screen.getByRole("spinbutton", {name: /hour/i})).toHaveTextContent("9");

    rerender(
      <TimeField name="time" value={new Time(14, 15)} onChange={onChange}>
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
      </TimeField>,
    );

    expect(screen.getByRole("spinbutton", {name: /hour/i})).toHaveTextContent("2");
    expect(screen.getByRole("spinbutton", {name: /minute/i})).toHaveTextContent("15");
    expect(screen.getByRole("spinbutton", {name: /AM\/PM/i})).toHaveTextContent("PM");
  });

  it("supports isRequired and shows FieldError when isInvalid", () => {
    render(
      <TimeField isInvalid isRequired name="time">
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <FieldError>Please enter a valid time</FieldError>
      </TimeField>,
    );

    expect(document.querySelector('[data-slot="time-field"]')).toHaveAttribute(
      "data-required",
      "true",
    );
    expect(screen.getByText("Please enter a valid time")).toBeInTheDocument();
  });

  it("exposes accessible description via Description", () => {
    render(
      <TimeField name="time">
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>Enter a time</Description>
      </TimeField>,
    );

    expect(document.querySelector('[data-slot="description"]')).not.toBeNull();
    expect(screen.getByText("Enter a time")).toBeInTheDocument();
  });

  it("supports disabled state and blocks value changes", async () => {
    const onChange = vi.fn();

    renderTimeField({defaultValue: new Time(9, 30), isDisabled: true, onChange});

    const minute = screen.getByRole("spinbutton", {name: /minute/i});

    await user.click(minute);
    await user.keyboard("{ArrowUp}");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports prefix and suffix composition data-slots", () => {
    render(
      <TimeField name="time">
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Prefix>
            <span>prefix</span>
          </TimeField.Prefix>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
          <TimeField.Suffix>
            <span>suffix</span>
          </TimeField.Suffix>
        </TimeField.Group>
      </TimeField>,
    );

    expect(document.querySelector('[data-slot="date-input-group-prefix"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="date-input-group-suffix"]')).not.toBeNull();
  });

  it("supports focus-visible via keyboard", async () => {
    renderTimeField({defaultValue: new Time(9, 30)});

    await user.tab();
    const hour = screen.getByRole("spinbutton", {name: /hour/i});

    expect(hour).toHaveFocus();

    const focusTarget = document.querySelector("[data-focus-visible='true']");

    expect(focusTarget).not.toBeNull();
  });

  it("supports children as a render function receiving field state", () => {
    render(
      <TimeField isRequired name="time">
        {({isRequired}) => (
          <>
            <Label>Time</Label>
            <TimeField.Group>
              <TimeField.Input>
                {(segment) => <TimeField.Segment segment={segment} />}
              </TimeField.Input>
            </TimeField.Group>
            <Description>{isRequired ? "Required" : "Optional"}</Description>
          </>
        )}
      </TimeField>,
    );

    expect(screen.getByRole("spinbutton", {name: /hour/i})).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
