import {Progress} from "@nextui-org/react";

export default function App() {
  return (
    <Progress isStriped aria-label="Loading..." className="max-w-md" color="secondary" value={60} />
  );
}
