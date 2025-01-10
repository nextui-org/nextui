import {addToast, Button} from "@nextui-org/react";

export default function App() {
  return (
    <>
      <div className="flex flex-wrap gap-x-2">
        {["none", "sm", "md", "lg", "full"].map((radius) => (
          <Button
            key={radius}
            className="w-fit m-2"
            variant={"bordered"}
            onPress={() =>
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
                // @ts-ignore
                radius: radius,
                color: "primary",
              })
            }
          >
            Show radius-{radius} toast
          </Button>
        ))}
      </div>
    </>
  );
}
