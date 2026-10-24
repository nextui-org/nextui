import {render} from "@heroui/testing/browser";
import {CalendarDate} from "@internationalized/date";
import {page} from "vitest/browser";

import {Calendar} from "@/components/calendar";
import {I18nProvider} from "@/components/rac";

// Column sizing and label truncation live in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

const renderCalendar = (locale: string) =>
  render(
    <I18nProvider locale={locale}>
      <Calendar aria-label="Event date" defaultValue={new CalendarDate(2026, 10, 1)}>
        <Calendar.Header>
          <Calendar.Heading />
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
    </I18nProvider>,
  );

const getHeaderCells = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[data-slot="calendar-header-cell"]'));

const getGrid = () => document.querySelector<HTMLElement>('[data-slot="calendar-grid"]')!;

// Sub-pixel rounding between tracks is expected; anything beyond that is a real overflow.
const TOLERANCE = 1;

describe("Calendar (browser)", () => {
  describe("weekday header layout", () => {
    it("renders Portuguese (pt-PT) weekday labels in seven equal columns inside the grid", async () => {
      await renderCalendar("pt-PT");

      await expect.element(page.getByRole("grid", {name: "Event date"})).toBeInTheDocument();

      const grid = getGrid().getBoundingClientRect();
      const cells = getHeaderCells();

      expect(cells).toHaveLength(7);

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
    });

    it("truncates pt-PT labels that are wider than their column instead of overflowing", async () => {
      await renderCalendar("pt-PT");

      await expect.element(page.getByRole("grid", {name: "Event date"})).toBeInTheDocument();

      const cells = getHeaderCells();

      // pt-PT "short" weekdays are "domingo", "segunda", … — wider than a 36px column.
      expect(cells.map((cell) => cell.textContent)).toEqual([
        "domingo",
        "segunda",
        "terça",
        "quarta",
        "quinta",
        "sexta",
        "sábado",
      ]);

      for (const cell of cells) {
        const style = getComputedStyle(cell);

        expect(style.overflow).toBe("hidden");
        expect(style.textOverflow).toBe("ellipsis");
        expect(style.whiteSpace).toBe("nowrap");
      }
    });

    it("keeps short English labels fully visible with no truncation", async () => {
      await renderCalendar("en-US");

      await expect.element(page.getByRole("grid", {name: "Event date"})).toBeInTheDocument();

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
        const rect = cell.getBoundingClientRect();

        expect(rect.right).toBeLessThanOrEqual(grid.right + TOLERANCE);
        expect(cell.scrollWidth).toBeLessThanOrEqual(cell.clientWidth);
      }
    });

    it("keeps body day cells aligned with the header columns", async () => {
      await renderCalendar("pt-PT");

      await expect.element(page.getByRole("grid", {name: "Event date"})).toBeInTheDocument();

      const headerRects = getHeaderCells().map((cell) => cell.getBoundingClientRect());
      const firstRow = document.querySelector<HTMLElement>(
        '[data-slot="calendar-grid-body"] > tr',
      )!;
      const dayRects = Array.from(firstRow.children).map((cell) => cell.getBoundingClientRect());

      expect(dayRects).toHaveLength(7);

      for (const [index, headerRect] of headerRects.entries()) {
        expect(Math.abs(headerRect.left - dayRects[index]!.left)).toBeLessThanOrEqual(TOLERANCE);
        expect(Math.abs(headerRect.right - dayRects[index]!.right)).toBeLessThanOrEqual(TOLERANCE);
      }
    });
  });
});
