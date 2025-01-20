import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <>
      <div>
        <Button
          onPress={() => {
            addToast({
              title: "Toast Title",
              description: "Toast Displayed Successfully",
              promise: new Promise((resolve) => setTimeout(resolve, 4000)),
            });
          }}
        >
          Show Toast
        </Button>
      </div>
    </>
  );
}
