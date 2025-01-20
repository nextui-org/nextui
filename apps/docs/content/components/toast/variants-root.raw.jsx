import {ToastProvider} from "@heroui/react";

import Variants from "./variants.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <Variants />
    </>
  );
}
