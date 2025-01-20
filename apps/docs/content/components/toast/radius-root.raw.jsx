import {ToastProvider} from "@heroui/react";

import Radius from "./radius.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <Radius />
    </>
  );
}
