import {ToastProvider} from "@heroui/react";

import WithTimeout from "./with-timeout.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <WithTimeout />
    </>
  );
}
