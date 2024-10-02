const App = `import {RangeCalendar} from "@nextui-org/react";

export default function App() {
  return (
    <RangeCalendar 
      aria-label="Date (Show Month and Year Picker)" 
      showMonthAndYearPickers 
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
