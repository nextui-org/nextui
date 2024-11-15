const App = `import {Alert, Button} from "@nextui-org/react";

export default function App() {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div className="flex items-center justify-center w-full">
      {!isVisible && (
        <Button
          className="bg-background text-default-700 font-medium border-1 shadow-small"
          size="sm"
          variant="bordered"
          onPress={() => setIsVisible(true)}
        >
          Show Alert
        </Button>
      )}
      <Alert
        classNames={{
          base: [
            "bg-default-50 dark:bg-background",
            "relative before:content-[''] before:absolute before:z-10",
            "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1 before:bg-secondary",
            "rounded-l-none border-l-0",
          ],
          mainWrapper: "pt-1",
          iconWrapper: "border-1 border-secondary-200 dark:bg-transparent",
          alertIcon: "text-secondary",
        }}
        isVisible={isVisible}
        title="The documents you requested are ready to be viewed"
        variant="faded"
        onClose={() => setIsVisible(false)}
      >
        <div className="flex items-center gap-1 mt-3">
          <Button
            className="bg-background text-default-700 font-medium border-1 shadow-small"
            size="sm"
            variant="bordered"
          >
            View documents
          </Button>
          <Button
            className="text-default-500 font-medium underline underline-offset-4"
            size="sm"
            variant="light"
          >
            Maybe later
          </Button>
        </div>
      </Alert>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
