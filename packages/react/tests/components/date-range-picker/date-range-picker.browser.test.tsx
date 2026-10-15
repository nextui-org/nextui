import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {DateField} from "@/components/date-field";
import {DateRangePicker} from "@/components/date-range-picker";
import {Label} from "@/components/label";
import {RangeCalendar} from "@/components/range-calendar";

import {animatedProperties, stretchAnimation} from "../../helpers/overlay-motion";

import "@/styles.css";

const renderDateRangePicker = (customLayout = false) =>
  render(
    <DateRangePicker>
      <Label>Trip dates</Label>
      <DateField.Group>
        <DateField.Input slot="start">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateRangePicker.RangeSeparator />
        <DateField.Input slot="end">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <DateRangePicker.Trigger aria-label="Open calendar">
            <DateRangePicker.TriggerIndicator />
          </DateRangePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DateRangePicker.Popover
        aria-label={customLayout ? "Choose a range" : undefined}
        className={customLayout ? "flex items-start gap-4" : undefined}
      >
        <RangeCalendar aria-label="Selected range">
          <RangeCalendar.Header>
            <RangeCalendar.YearPickerTrigger>
              <RangeCalendar.YearPickerTriggerHeading />
              <RangeCalendar.YearPickerTriggerIndicator />
            </RangeCalendar.YearPickerTrigger>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar>
        {customLayout ? <button type="button">Use today</button> : null}
      </DateRangePicker.Popover>
    </DateRangePicker>,
  );

describe("DateRangePicker (browser)", () => {
  it("opens with an opacity and transform only animation", async () => {
    stretchAnimation('.date-range-picker__popover[data-entering="true"]');
    await renderDateRangePicker();
    await page.getByRole("button", {name: /Open calendar/}).click();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const popover = document.querySelector<HTMLElement>(".date-range-picker__popover")!;
    const {animation, properties} = animatedProperties(popover);

    expect(animation?.animationName).toMatch(/^heroui-overlay-enter-95/);
    expect(properties).toEqual(["opacity", "transform"]);
  });

  it("closes with an opacity and transform animation", async () => {
    stretchAnimation('.date-range-picker__popover[data-exiting="true"]');
    await renderDateRangePicker();
    await page.getByRole("button", {name: /Open calendar/}).click();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const openPopover = document.querySelector<HTMLElement>(".date-range-picker__popover")!;

    await expect.poll(() => openPopover.getAnimations().length).toBe(0);
    await userEvent.keyboard("{Escape}");

    const popover = document.querySelector<HTMLElement>(".date-range-picker__popover")!;

    expect(popover).toHaveAttribute("data-exiting", "true");

    const {animation, properties} = animatedProperties(popover);

    expect(animation?.animationName).toBe("heroui-overlay-exit");
    expect(getComputedStyle(popover).animationFillMode).toBe("none");
    expect(properties).toEqual(["opacity", "transform"]);
  });
  it("renders a named dialog and returns focus to its trigger on Escape", async () => {
    await renderDateRangePicker();
    const trigger = page.getByRole("button", {name: /Open calendar/});

    await trigger.click();
    await expect.element(page.getByRole("dialog", {name: /Trip dates/})).toBeInTheDocument();
    expect(page.getByRole("dialog").element()).toHaveAttribute(
      "data-slot",
      "date-range-picker-popover",
    );
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(1);
    expect(
      document.querySelector('[role="banner"], header[data-slot$="calendar-header"]'),
    ).toBeNull();
    await userEvent.keyboard("{Escape}");
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it("supports custom horizontal popup layouts and an explicit dialog name", async () => {
    await renderDateRangePicker(true);
    await page.getByRole("button", {name: /Open calendar/}).click();
    await expect.element(page.getByRole("dialog", {name: "Choose a range"})).toBeInTheDocument();

    const preset = page.getByRole("button", {name: "Use today"});
    const calendar = document.querySelector('[data-slot="range-calendar"]')!;

    await expect
      .poll(() => {
        const calendarRect = calendar.getBoundingClientRect();
        const presetRect = preset.element().getBoundingClientRect();

        return presetRect.left - calendarRect.right;
      })
      .toBeGreaterThan(0);
  });
});
