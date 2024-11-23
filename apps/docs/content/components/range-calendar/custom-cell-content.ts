const App = `import {RangeCalendar, CalendarCellContent, CalendarCellHeader, CalendarCellBody} from "@nextui-org/react";

export default function App() {
  return (
    <RangeCalendar>
      <CalendarCellContent>
        <CalendarCellHeader />
        <CalendarCellBody>
          <div className="flex flex-col w-full gap-0.5 justify-center items-center p-0.5">
            <span className="bg-red-600 h-1 w-full rounded-full" />
            <span className="bg-green-600 h-1 w-full rounded-full" />
            <span className="bg-yellow-600 h-1 w-full rounded-full" />
          </div>
        </CalendarCellBody>
      </CalendarCellContent>
    </RangeCalendar>
  );
}`;

const AppTs = `import {RangeCalendar, CalendarCellContent, CalendarCellHeader, CalendarCellBody} from "@nextui-org/react";

export default function App() {
  return (
    <RangeCalendar>
      <CalendarCellContent>
        <CalendarCellHeader />
        <CalendarCellBody>
          <div className="flex flex-col w-full gap-0.5 justify-center items-center p-0.5">
            <span className="bg-red-600 h-1 w-full rounded-full" />
            <span className="bg-green-600 h-1 w-full rounded-full" />
            <span className="bg-yellow-600 h-1 w-full rounded-full" />
          </div>
        </CalendarCellBody>
      </CalendarCellContent>
    </RangeCalendar>
  );
}`;

const react = {
  "/App.jsx": App,
  "/App.tsx": AppTs,
};

export default {
  ...react,
};
