import {ToastProvider} from "@nextui-org/react";

import Position from "./placement.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider placement="center-bottom" />
      <Position />
    </>
  );
}
