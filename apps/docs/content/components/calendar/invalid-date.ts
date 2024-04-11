const App = `import {Calendar, DateValue} from "@nextui-org/react";
import {today, getLocalTimeZone, isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";


export default function App() {
  let [date, setDate] = React.useState<DateValue>(today(getLocalTimeZone()));
  let {locale} = useLocale();
  let isInvalid = isWeekend(date, locale);

  return (
    <div className="p-4">
      <Calendar
        aria-label="Date (Invalid on weekends)"
        errorMessage={isInvalid ? "We are closed on weekends" : undefined}
        isInvalid={isInvalid}
        value={date}
        onChange={setDate}
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
