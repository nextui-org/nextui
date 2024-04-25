const App = `import {RangeCalendar} from "@nextui-org/react";
import {isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";

export default function App() {
  let {locale} = useLocale();

  return (
    <RangeCalendar
      allowsNonContiguousRanges
      aria-label="Time off request"
      isDateUnavailable={(date) => isWeekend(date, locale)}
    />
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
