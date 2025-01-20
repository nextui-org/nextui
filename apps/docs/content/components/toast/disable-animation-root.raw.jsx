import {ToastProvider} from "@heroui/react";

import DisableAnimation from "./disable-animation.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider disableAnimation />
      <DisableAnimation />
    </>
  );
}
