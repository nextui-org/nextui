import {addToast, Button} from "@nextui-org/react";

export default function App() {
  return (
    <>
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
