const App = `import {Calendar, CalendarCellContent, CalendarCellButton, CalendarCellBody} from "@nextui-org/react";

export default function App() {
  return (
    <Calendar>
      <CalendarCellContent>
        <CalendarCellButton />
        <CalendarCellBody>
          <div className="flex flex-col w-full gap-0.5 justify-center items-center p-0.5">
            <span className="bg-red-600 h-1 w-full rounded-full" />
            <span className="bg-green-600 h-1 w-full rounded-full" />
            <span className="bg-yellow-600 h-1 w-full rounded-full" />
          </div>
        </CalendarCellBody>
      </CalendarCellContent>
    </Calendar>
  );
}`;

const AppTs = `import {Calendar, CalendarCellContent, CalendarCellHeader, CalendarCellBody} from "@nextui-org/react";

export default function App() {
  return (
    <Calendar>
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
    </Calendar>
  );
}`;

const react = {
  "/App.jsx": App,
  "/App.tsx": AppTs,
};

export default {
  ...react,
};
