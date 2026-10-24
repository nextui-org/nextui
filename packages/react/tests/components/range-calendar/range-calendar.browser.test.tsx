import {render} from "@heroui/testing/browser";
import {CalendarDate} from "@internationalized/date";
import {page} from "vitest/browser";

import {I18nProvider} from "@/components/rac";
import {RangeCalendar} from "@/components/range-calendar";

// Column sizing and label truncation live in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

const renderRangeCalendar = (locale: string) =>
  render(
    <I18nProvider locale={locale}>
      <RangeCalendar
        aria-label="Trip dates"
        defaultValue={{start: new CalendarDate(2026, 10, 1), end: new CalendarDate(2026, 10, 5)}}
      >
        <RangeCalendar.Header>
          <RangeCalendar.Heading />
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
    </I18nProvider>,
  );

const getHeaderCells = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[data-slot="range-calendar-header-cell"]'));

const getGrid = () => document.querySelector<HTMLElement>('[data-slot="range-calendar-grid"]')!;

// Sub-pixel rounding between tracks is expected; anything beyond that is a real overflow.
const TOLERANCE = 1;

describe("RangeCalendar (browser)", () => {
  describe("weekday header layout", () => {
    it("renders Portuguese (pt-PT) weekday labels in seven equal columns inside the grid", async () => {
      await renderRangeCalendar("pt-PT");

      await expect.element(page.getByRole("grid", {name: "Trip dates"})).toBeInTheDocument();

      const grid = getGrid().getBoundingClientRect();
      const cells = getHeaderCells();

      expect(cells).toHaveLength(7);
      expect(cells.map((cell) => cell.textContent)).toEqual([
        "domingo",
        "segunda",
        "terça",
        "quarta",
        "quinta",
        "sexta",
        "sábado",
      ]);

      const rects = cells.map((cell) => cell.getBoundingClientRect());
      const columnWidth = grid.width / 7;

      for (const [index, rect] of rects.entries()) {
        expect(rect.left).toBeGreaterThanOrEqual(grid.left - TOLERANCE);
        expect(rect.right).toBeLessThanOrEqual(grid.right + TOLERANCE);
        expect(Math.abs(rect.width - columnWidth)).toBeLessThanOrEqual(TOLERANCE);

        const next = rects[index + 1];

        if (next) {
          expect(rect.right).toBeLessThanOrEqual(next.left + TOLERANCE);
        }
      }

      for (const cell of cells) {
        const style = getComputedStyle(cell);

        expect(style.overflow).toBe("hidden");
        expect(style.textOverflow).toBe("ellipsis");
        expect(style.whiteSpace).toBe("nowrap");
      }
    });

    it("keeps short English labels fully visible with no truncation", async () => {
      await renderRangeCalendar("en-US");

      await expect.element(page.getByRole("grid", {name: "Trip dates"})).toBeInTheDocument();

      const grid = getGrid().getBoundingClientRect();
      const cells = getHeaderCells();

      expect(cells.map((cell) => cell.textContent)).toEqual([
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ]);

      for (const cell of cells) {
        expect(cell.getBoundingClientRect().right).toBeLessThanOrEqual(grid.right + TOLERANCE);
        expect(cell.scrollWidth).toBeLessThanOrEqual(cell.clientWidth);
      }
    });
  });
});
