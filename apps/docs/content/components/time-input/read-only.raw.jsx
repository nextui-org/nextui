import {TimeInput} from "@heroui/react";
import {Time} from "@internationalized/date";

export default function App() {
  return <TimeInput isReadOnly defaultValue={new Time(11, 45)} label="Event Time" />;
}
