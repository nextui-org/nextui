import {ToastProvider} from "@heroui/react";

import HiddenIcon from "./hidden-icon.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <HiddenIcon />
    </>
  );
}
