import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <>
      <Button
        onPress={() =>
          addToast({
            title: "Toast title",
          })
        }
      >
        Show toast
      </Button>
    </>
  );
}
