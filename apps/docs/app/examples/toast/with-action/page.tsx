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
            endContent: (
              <Button color="warning" size="sm" variant="flat">
                Upgrade
              </Button>
            ),
            color: "warning",
          });
        }}
      >
        Show Toast
      </Button>
    </>
  );
}
