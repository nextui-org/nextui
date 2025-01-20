import {ToastProvider} from "@heroui/react";

import ColorDemo from "./color.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <ColorDemo />
    </>
  );
}
