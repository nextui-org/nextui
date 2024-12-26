import {addToast, Button, ToastProvider} from "@nextui-org/react";

export default function App() {
  return (
    <>
      <ToastProvider />
      <Button
        onPress={() =>
          addToast({
            title: "Toast title",
            description: "Toast displayed successfully",
          })
        }
      >
        Show toast
      </Button>
    </>
  );
}
