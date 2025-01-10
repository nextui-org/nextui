import {ToastProvider} from "@nextui-org/react";

import CustomStyles from "./custom-styles.raw.jsx?raw";

export default function App() {
  return (
    <>
      <ToastProvider />
      <CustomStyles />
    </>
  );
}
