import {ToastProvider} from "@nextui-org/react";

import HiddenIcon from "./hidden-icon.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <HiddenIcon />
    </>
  );
}
