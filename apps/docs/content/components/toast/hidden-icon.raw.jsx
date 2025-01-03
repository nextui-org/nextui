import {addToast, Button, ToastProvider} from "@nextui-org/react";

export default function App() {
  return (
    <>
      <ToastProvider />
      <div className="flex flex-wrap gap-x-2">
        <Button
          className="w-fit m-2"
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              hideIcon: true,
            })
          }
        >
          Show toast with hidden icon
        </Button>
      </div>
    </>
  );
}
