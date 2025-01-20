import {addToast, Button} from "@heroui/react";

export default function App() {
  return (
    <>
      <Button
        onPress={() => {
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            endContent: (
              <Button color="warning" size="sm" variant="flat">
                Upgrade
              </Button>
            ),
            color: "warning",
            variant: "faded",
          });
        }}
      >
        Show Toast
      </Button>
    </>
  );
}
