import {ToastProvider} from "@nextui-org/react";

import Description from "./description.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <Description />
    </>
  );
}
