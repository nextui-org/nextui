import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <>
      <div className="flex flex-wrap gap-x-2">
        <Button
          className="w-fit m-2"
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
            })
          }
        >
          Show toast
        </Button>
      </div>
    </>
  );
}
