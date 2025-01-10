import {ToastProvider} from "@nextui-org/react";

import CustomIcon from "./custom-icon.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <CustomIcon />
    </>
  );
}
