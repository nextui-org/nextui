import {TimeInput} from "@nextui-org/react";
import {Time} from "@internationalized/date";

export default function App() {
  return <TimeInput isDisabled defaultValue={new Time(11, 45)} label="Event Time" />;
}
