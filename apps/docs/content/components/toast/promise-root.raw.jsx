import {ToastProvider} from "@nextui-org/react";

import Promise from "./promise.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <Promise />
    </>
  );
}
