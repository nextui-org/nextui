import {ToastProvider} from "@nextui-org/react";

import WithTimeout from "./with-timeout.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <WithTimeout />
    </>
  );
}
