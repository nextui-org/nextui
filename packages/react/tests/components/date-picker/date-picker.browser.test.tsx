import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {Calendar} from "@/components/calendar";
import {DateField} from "@/components/date-field";
import {DatePicker} from "@/components/date-picker";
import {Label} from "@/components/label";

import {animatedProperties, stretchAnimation} from "../../helpers/overlay-motion";

import "@/styles.css";

const renderDatePicker = (customLayout = false) =>
  render(
    <DatePicker>
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger aria-label="Open calendar">
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover
        aria-label={customLayout ? "Choose a date" : undefined}
        className={customLayout ? "flex items-start gap-4" : undefined}
      >
        <Calendar aria-label="Selected date">
          <Calendar.Header>
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
        {customLayout ? <button type="button">Use today</button> : null}
      </DatePicker.Popover>
    </DatePicker>,
  );

describe("DatePicker (browser)", () => {
  it("opens with an opacity and transform only animation", async () => {
    stretchAnimation('.date-picker__popover[data-entering="true"]');
    await renderDatePicker();
    await page.getByRole("button", {name: /Open calendar/}).click();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const popover = document.querySelector<HTMLElement>(".date-picker__popover")!;
    const {animation, properties} = animatedProperties(popover);

    expect(animation?.animationName).toMatch(/^heroui-overlay-enter-95/);
    expect(properties).toEqual(["opacity", "transform"]);
  });

  it("closes with an opacity and transform animation", async () => {
    stretchAnimation('.date-picker__popover[data-exiting="true"]');
    await renderDatePicker();
    await page.getByRole("button", {name: /Open calendar/}).click();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const openPopover = document.querySelector<HTMLElement>(".date-picker__popover")!;

    await expect.poll(() => openPopover.getAnimations().length).toBe(0);
    await userEvent.keyboard("{Escape}");

    const popover = document.querySelector<HTMLElement>(".date-picker__popover")!;

    expect(popover).toHaveAttribute("data-exiting", "true");

    const {animation, properties} = animatedProperties(popover);

    expect(animation?.animationName).toBe("heroui-overlay-exit");
    expect(getComputedStyle(popover).animationFillMode).toBe("none");
    expect(properties).toEqual(["opacity", "transform"]);
  });
  it("renders a named dialog and returns focus to its trigger on Escape", async () => {
    await renderDatePicker();
    const trigger = page.getByRole("button", {name: /Open calendar/});

    await trigger.click();
    await expect.element(page.getByRole("dialog", {name: /Date/})).toBeInTheDocument();
    expect(page.getByRole("dialog").element()).toHaveAttribute("data-slot", "date-picker-popover");
    expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(1);
    expect(
      document.querySelector('[role="banner"], header[data-slot$="calendar-header"]'),
    ).toBeNull();
    await userEvent.keyboard("{Escape}");
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it("supports custom horizontal popup layouts and an explicit dialog name", async () => {
    await renderDatePicker(true);
    await page.getByRole("button", {name: /Open calendar/}).click();
    await expect.element(page.getByRole("dialog", {name: "Choose a date"})).toBeInTheDocument();

    const preset = page.getByRole("button", {name: "Use today"});
    const calendar = document.querySelector('[data-slot="calendar"]')!;

    await expect
      .poll(() => {
        const calendarRect = calendar.getBoundingClientRect();
        const presetRect = preset.element().getBoundingClientRect();

        return presetRect.left - calendarRect.right;
      })
      .toBeGreaterThan(0);
  });
});
