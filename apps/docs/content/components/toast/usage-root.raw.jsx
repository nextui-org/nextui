import {ToastProvider} from "@nextui-org/react";

import Usage from "./usage.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <Usage />
    </>
  );
}
