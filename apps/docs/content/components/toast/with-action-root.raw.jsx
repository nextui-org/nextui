import {ToastProvider} from "@heroui/react";

import WithAction from "./with-action.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <WithAction />
    </>
  );
}
