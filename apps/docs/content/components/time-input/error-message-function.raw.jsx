import {TimeInput} from "@nextui-org/react";

export default function App() {
  return (
    <TimeInput
      isInvalid
      errorMessage={(value) => {
        if (value.isInvalid) {
          return "Please enter a valid time";
        }
      }}
      label="Event Time"
    />
  );
}
