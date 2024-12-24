const App = `import {Calendar, CalendarCellContent, CalendarCellHeader, CalendarCellBody} from "@nextui-org/react";

export default function App() {
  return (
    <Calendar calendarWidth={400}>
      {(date) => (
        <CalendarCellContent>
          <CalendarCellHeader />
          <CalendarCellBody>
            <div className="flex flex-col w-full text-tiny gap-0.5 px-0.5">
              {date.day % 7 === 0 && (
                <span 
                  className="bg-red-500/20 w-full rounded-md px-1 text-red-400 line-clamp-1"
                  role="status"
                  aria-label="Birthday event"
                > 
                Birth day
                </span>
              )}
              {date.day % 5 === 0 && (
                <span 
                  className="bg-green-500/20 w-full rounded-md px-1 text-green-400 line-clamp-1"
                  role="status"
                  aria-label="Birthday event"
                > 
                  MTG
                </span>
              )}
              {date.day % 3 === 0 && (
                <span 
                  className="bg-yellow-500/20 w-full rounded-md px-1 text-yellow-400 line-clamp-1"
                  role="status"
                  aria-label="Birthday event"
                > 
                  MTG
                </span>
              )}
            </div>
          </CalendarCellBody>
        </CalendarCellContent>
      )}
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
