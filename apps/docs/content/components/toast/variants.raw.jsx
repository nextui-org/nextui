import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <>
      <div className="flex flex-wrap gap-x-2">
        {["solid", "bordered", "flat", "faded"].map((variant) => (
          <Button
            key={variant}
            className="w-fit m-2"
            variant={"bordered"}
            onPress={() =>
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
                // @ts-ignore
                variant: variant,
                color: "secondary",
              })
            }
          >
            Show {variant} toast
          </Button>
        ))}
      </div>
    </>
  );
}
