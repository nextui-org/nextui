import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <>
      <div className="flex flex-wrap gap-x-2">
        {[
          "left-top",
          "right-top",
          "center-top",
          "left-bottom",
          "right-bottom",
          "center-bottom",
        ].map((position) => (
          <Button
            key={position}
            className="w-fit m-2"
            variant={"bordered"}
            onPress={() =>
              addToast({
                title: "Toast title",
                description: "Toast displayed successfully",
              })
            }
          >
            Show toast at {position}
          </Button>
        ))}
      </div>
    </>
  );
}
