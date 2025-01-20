"use client";
import {addToast, Button, ToastProvider} from "@heroui/react";

export default function App() {
  return (
    <>
      <ToastProvider />
      <Button
        className="w-fit m-2"
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            timeout: 3000,
          });
        }}
      >
        Show Toast
      </Button>
    </>
  );
}
