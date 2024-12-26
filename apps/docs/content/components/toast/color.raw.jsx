import {addToast, Button, ToastProvider} from "@nextui-org/react";

export default function App() {
  return (
    <>
      <ToastProvider />
      <div className="flex flex-wrap gap-x-2">
        {["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
          <Button
            key={color}
            className="w-fit m-2"
            // @ts-ignore
            color={color}
            variant={"bordered"}
            onPress={() =>
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
                // @ts-ignore
                color: color,
              })
            }
          >
            Show {color} toast
          </Button>
        ))}
      </div>
    </>
  );
}
