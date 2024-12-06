import {Alert, Button} from "@nextui-org/react";

export default function App() {
  const [isVisible, setIsVisible] = React.useState(true);

  const title = "Success Notification";
  const description =
    "Your action has been completed successfully. We'll notify you when updates are available.";

  return (
    <div className="flex flex-col gap-4">
      {isVisible ? (
        <Alert
          color="success"
          description={description}
          isVisible={isVisible}
          title={title}
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
      ) : (
        <Button variant="bordered" onPress={() => setIsVisible(true)}>
          Show Alert
        </Button>
      )}
    </div>
  );
}
