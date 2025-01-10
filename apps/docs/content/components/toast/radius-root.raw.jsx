import {ToastProvider} from "@nextui-org/react";

import Radius from "./radius.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <Radius />
    </>
  );
}
