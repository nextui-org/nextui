const App = `import {Calendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function App() {
  return (
    <div className="p-4">
      <Calendar 
        aria-label="Date (Read Only)" 
        value={today(getLocalTimeZone())} 
        isReadOnly 
      />
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
